import { defineStore } from 'pinia';
import type { Card } from '@/types/card/card';

export const searchStore = defineStore('searchStore', {
  state: () => ({ 
    list: [] as Card[],
    loading: false,
    numFound: 0,
    searchQuery: '',
    offset: 0,
    itemsPerPage: 6,
    isBeenSearched: false,
    paginationState: {
      currentPage: 0,
      totalPages: 0
    }
  }),
  actions: {
    async loadList(query: string) {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      return res.json();
    },
    async updateModel() {
      try {
          this.loading = true;
          this.list = [];
          const data = await this.loadList(this.searchQuery);                
          this.numFound = data.numFound;
          this.list = data.docs;   
          this.offset = this.list.length;             
          this.paginationState.totalPages = Math.floor(this.list.length / this.itemsPerPage);                
          this.loading = false;
          this.isBeenSearched = !!this.searchQuery.length;
      } catch (e) {
          console.log(e);    
      }
    },
    updateTotalPagesAmount() {
      this.paginationState.totalPages = Math.floor((this.list.length-1) / this.itemsPerPage); 
    },
    handleItemsPerPage(newVal: number) {
      this.itemsPerPage = newVal;
      this.updateTotalPagesAmount();
    },
    resetSearchedState() {
      this.isBeenSearched = false;
    }
  },
  getters: {
    formattedList: (state) => state.list.slice(state.paginationState.currentPage * state.itemsPerPage, (state.paginationState.currentPage+1) * state.itemsPerPage),
    isListNotEmpty: (state) => !!state.list.length,
    isSearchEmpty: (state) => !state.list.length && state.searchQuery.length && state.isBeenSearched
  }
})
