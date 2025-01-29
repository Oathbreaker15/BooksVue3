import { reactive, computed, toRefs, toRef } from 'vue';
import { defineStore } from 'pinia';
import type { Card } from '@/types/card/card';
import { camalizeCardKeys } from '@/composition/camalizeCardKeys';
import { usePagination } from '@/composition/usePagination';

const API_URL = 'https://openlibrary.org/search.json';

export const searchStore = defineStore('searchStore',() => {
  const pagination = usePagination<Card>();

  const state = reactive({
    loading: false,
    numFound: 0,
    searchQuery: '',
    offset: 0,
    hasBeenSearched: false,
  });

  
  const loadList = async(query: string) => {
    const res = await fetch(`${API_URL}?q=${query}`);
    return res.json();
  }

  const fetchBooks = async() => {
    try {
      state.loading = true;
      pagination.resetState();
      const data = await loadList(state.searchQuery);      
      const mappedDocs = data.docs.map((el: Card) => camalizeCardKeys<object>(el));
      pagination.list.splice(0, pagination.list.length, ...mappedDocs);
      pagination.updateTotalPagesAmount();
      state.numFound = data.numFound;          
    } catch (e) {
      console.error('Error updating model:', e); 
    } finally {
      state.loading = false;
      state.hasBeenSearched = !!state.searchQuery.length;
    }
  }

  const updateSearchQuery = (query: string) => {
    state.searchQuery = query;
  }

  const resetSearchedState = () => {
    state.hasBeenSearched = false;
  }

  const isSearchEmpty = computed(() => !pagination.list.length && state.searchQuery.length && state.hasBeenSearched);

  return {
    //state
    ...toRefs(state),
    list: toRef(pagination, 'list'),
    itemsPerPage: toRef(pagination, 'itemsPerPage'),
    paginationState: toRef(pagination, 'paginationState'),

    //methods
    loadList,
    fetchBooks,
    updateSearchQuery,
    resetSearchedState,
    updateTotalPagesAmount: pagination.updateTotalPagesAmount,
    handleCurrentPage: pagination.handleCurrentPage,
    handleItemsPerPage: pagination.handleItemsPerPage,
    toPrevPage: pagination.toPrevPage,
    toNextPage: pagination.toNextPage,

    //computed
    formattedList: pagination.formattedList,
    isListNotEmpty: pagination.isListNotEmpty,
    isSearchEmpty,
  }
})