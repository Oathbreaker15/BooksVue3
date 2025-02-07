import { computed, toRefs } from 'vue';
import { defineStore } from 'pinia';
import type { Card } from '@/types/card/card';
import { usePagination } from '@/composition/usePagination';

export const favsStore = defineStore('favsStore', () => {
  const pagination = usePagination<Card>();

  const addToFavs = (item: Card) => {
    pagination.list.value.push(item);
    pagination.updateTotalPagesAmount();
  }

  const removeFromFavs = (favBookIndex: number) => {
    pagination.list.value.splice(favBookIndex, 1);
    pagination.updateTotalPagesAmount();
    pagination.handleCurrentPage();
  }

  const isBookInFavs = (card: Card) => {
    return pagination.list.value.some((book: Card) => book.key === card.key);
  }

  const getFavBookIndex = (card: Card) => {
    return pagination.list.value.indexOf(card);
  }

  const updateTotalPagesAmount = pagination.updateTotalPagesAmount;
  const handleCurrentPage = pagination.handleCurrentPage;
  const handleItemsPerPage = pagination.handleItemsPerPage;
  const formattedList = pagination.formattedList;
  const isListNotEmpty = pagination.isListNotEmpty;

  const favsAmount = computed(() => pagination.list.value.length);

  return {
    // state
    ...toRefs(pagination),

    // methods
    addToFavs,
    removeFromFavs,
    isBookInFavs,
    getFavBookIndex,
    updateTotalPagesAmount,
    handleCurrentPage,
    handleItemsPerPage,
    toPrevPage: pagination.toPrevPage,
    toNextPage: pagination.toNextPage,

    // computed
    formattedList,
    isListNotEmpty,
    favsAmount
  }
})
