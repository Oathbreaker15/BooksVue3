import { ref, computed, toRefs } from 'vue'
import { defineStore } from 'pinia'
import type { Card } from '@/types/card/card'
import { camalizeCardKeys } from '@/composition/camalizeCardKeys'
import { usePagination } from '@/composition/usePagination'
import { SearchService } from '@/services/api'
import { localStorageService } from '@/services/localStorage'
import { safeParseJson } from '@/utils/localStorageUtils'

export const searchStore = defineStore('searchStore', () => {
  const pagination = usePagination<Card>()

  const loading = ref(false)
  const numFound = ref(0)
  const searchQuery = ref('')
  const offset = ref(0)
  const hasBeenSearched = ref(false)
  const loadingMoreBooks = ref(false)

  const searchBooks = async (query: string, offset?: number) => {
    return await SearchService.searchBooks(query, offset)
  }

  const fetchBooks = async () => {
    try {
      loading.value = true
      offset.value = 0
      pagination.resetState()
      const data = await searchBooks(searchQuery.value)
      const mappedDocs = data.docs.map((el: Card) => camalizeCardKeys<object>(el))
      handlePagination(mappedDocs)
      localStorageService.setItem('searchList', JSON.stringify(pagination.list.value))
      numFound.value = data.numFound
      localStorageService.setItem('numFound', JSON.stringify(numFound.value))
      localStorageService.setItem('searchQuery', JSON.stringify(searchQuery.value))
    } catch (e) {
      console.error('Error updating model:', e)
    } finally {
      loading.value = false
      hasBeenSearched.value = !!searchQuery.value.length
    }
  }

  const fetchMoreBooks = async () => {
    try {
      if (isLoadingMoreBooksAvailable.value) {
        loadingMoreBooks.value = true
        const data = await SearchService.searchBooks(searchQuery.value, offset.value)
        const mappedDocs = data.docs.map((el: Card) => camalizeCardKeys<object>(el))
        handlePagination(mappedDocs)
        localStorageService.setItem('searchList', JSON.stringify(pagination.list.value))
      }
    } catch (e) {
      console.error('Error updating model:', e)
    } finally {
      loadingMoreBooks.value = false
    }
  }

  const handlePagination = (mappedDocs: Card[]) => {
    offset.value += mappedDocs.length
    pagination.appendToList(mappedDocs)
    pagination.updateTotalPagesAmount()
  }

  const updateSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const resetSearchedState = () => {
    hasBeenSearched.value = false
  }

  const checkSearchQueryFromCache = () => {
    if (localStorageService.getItem('searchQuery')) {
      searchQuery.value = safeParseJson<string>(
        localStorageService.getItem('searchQuery')
      ) as string
    }
  }

  const checkNumFoundFromCache = () => {
    if (localStorageService.getItem('numFound')) {
      numFound.value = +(safeParseJson<string>(localStorageService.getItem('numFound')) as string)
    }
  }

  const isSearchEmpty = computed(
    () => !pagination.isListNotEmpty && searchQuery.value.length && hasBeenSearched.value
  )
  const isLoadingMoreBooksAvailable = computed(
    () =>
      pagination.isReachedUpdateThreshold.value &&
      offset.value < numFound.value &&
      !loadingMoreBooks.value
  )

  return {
    //state
    loading,
    numFound,
    searchQuery,
    offset,
    hasBeenSearched,
    ...toRefs(pagination),
    //methods
    fetchBooks,
    updateSearchQuery,
    resetSearchedState,
    fetchMoreBooks,
    checkSearchQueryFromCache,
    checkNumFoundFromCache,
    updateTotalPagesAmount: pagination.updateTotalPagesAmount,
    handleCurrentPage: pagination.handleCurrentPage,
    handleItemsPerPage: pagination.handleItemsPerPage,
    toPrevPage: pagination.toPrevPage,
    toNextPage: pagination.toNextPage,
    //computed
    formattedList: pagination.formattedList,
    isListNotEmpty: pagination.isListNotEmpty,
    isSearchEmpty
  }
})
