import { defineStore } from 'pinia';
import type { Card } from '@/types/card/card';

export const favsStore = defineStore('favsStore', {
  state: () => ({ 
    list: [] as Card[],
    itemsPerPage: 6,
    paginationState: {
      currentPage: 0,
      totalPages: 0
    }
  }),
  actions: {
    addToFavs(item: Card) {
      this.list.push(item);
      this.updateTotalPagesAmount();
    },
    removeFromFavs(favBookIndex: number) {
      this.list.splice(favBookIndex, 1);
      this.updateTotalPagesAmount();
      this.handleCurrentPage();
    },
    isBookInFavs(card: Card) {
      return this.list.find((book: Card) => book.key === card.key);
    },
    getFavBookIndex(card: Card) {
      return this.list.findIndex((book: Card) => book.key === card.key);
    },
    updateTotalPagesAmount() {
      this.paginationState.totalPages = Math.floor((this.list.length-1) / this.itemsPerPage); 
    },
    handleCurrentPage() {
      if (this.list.length && this.list.length % this.itemsPerPage === 0) {
        this.paginationState.currentPage--;
      }
    },
    handleItemsPerPage(newVal: number) {
      this.itemsPerPage = newVal;
      this.updateTotalPagesAmount();
  }
  },
  getters: {
    formattedList: (state) => state.list.slice(state.paginationState.currentPage * state.itemsPerPage, (state.paginationState.currentPage+1) * state.itemsPerPage),
    isListNotEmpty: (state) => !!state.list.length,
    favsAmount: (state) => state.list.length
  }
})
