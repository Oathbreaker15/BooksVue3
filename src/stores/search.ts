import { ref, computed, toRefs } from 'vue';
import { defineStore } from 'pinia';
import type { Card } from '@/types/card/card';
import { camalizeCardKeys } from '@/composition/camalizeCardKeys';
import { usePagination } from '@/composition/usePagination';
import { SearchService } from '@/services/api';

const API_URL = 'https://openlibrary.org/search.json';

export const searchStore = defineStore('searchStore',() => {
  const pagination = usePagination<Card>();

  const loading = ref(false);
  const numFound = ref(0);
  const searchQuery = ref('');
  const offset = ref(0);
  const hasBeenSearched = ref(false);
  const loadingMoreBooks = ref(false);
  
  const loadList = async(query: string) => {
    return await SearchService.searchBooks(query);
  }

  const fetchBooks = async() => {
    try {
      loading.value = true;
      offset.value = 0;
      pagination.resetState();
      const data = await loadList(searchQuery.value);      
      const mappedDocs = data.docs.map((el: Card) => camalizeCardKeys<object>(el));
      handlePagination(mappedDocs);
      numFound.value = data.numFound;          
    } catch (e) {
      console.error('Error updating model:', e); 
    } finally {
      loading.value = false;
      hasBeenSearched.value = !!searchQuery.value.length;
    }
  }

  const fetchMoreBooks = async() => {
    // const isLoadingMoreBooksAvailable = pagination.isReachedUpdateThreshold && (offset.value < numFound.value) && !loadingMoreBooks.value;
    
    try {
      if (isLoadingMoreBooksAvailable.value) {
        loadingMoreBooks.value = true;
        const data = await SearchService.fetchMoreBooks(searchQuery.value, offset.value, numFound.value);
        const mappedDocs = data.docs.map((el: Card) => camalizeCardKeys<object>(el));
        handlePagination(mappedDocs);
      }
    } catch (e) {
      console.error('Error updating model:', e); 
    } finally {
      loadingMoreBooks.value = false;
    }
  }

  const handlePagination = (mappedDocs: Card[]) => {
    offset.value += mappedDocs.length;
    pagination.updateList(mappedDocs)
    pagination.updateTotalPagesAmount();
  }

  const updateSearchQuery = (query: string) => {
    searchQuery.value = query;
  }

  const resetSearchedState = () => {
    hasBeenSearched.value = false;
  }

  const isSearchEmpty = computed(() => !pagination.isListNotEmpty && searchQuery.value.length && hasBeenSearched.value);
  const isLoadingMoreBooksAvailable = computed(() => pagination.isReachedUpdateThreshold && (offset.value < numFound.value) && !loadingMoreBooks.value);

  return {
    //state
    loading,
    numFound,
    searchQuery,
    offset,
    hasBeenSearched,
    ...toRefs(pagination),
    //methods
    loadList,
    fetchBooks,
    updateSearchQuery,
    resetSearchedState,
    fetchMoreBooks,
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