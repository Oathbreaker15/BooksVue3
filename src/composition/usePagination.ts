import { computed, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import { safeParseJson } from '@/utils/localStorageUtils'
import { localStorageService } from '@/services/localStorage'

export interface IPaginationState {
  currentPage: number
  totalPages: number
  updateThreshold: number
}

export interface IPaginationOptions {
  initialItemsOnPageCnt?: number
}

const DEFAULT_PAGE_COUNT = 6

export function usePagination<T>(options: IPaginationOptions = {}) {
  const list = ref<T[]>([])
  const itemsPerPage = ref(options.initialItemsOnPageCnt ?? DEFAULT_PAGE_COUNT)
  const paginationState = ref({
    currentPage: 0,
    totalPages: 0,
    updateThreshold: 5
  } as IPaginationState)

  const setInitialPaginationState = () => {
    paginationState.value.currentPage = 0
    paginationState.value.totalPages = 0
  }

  const resetState = () => {
    list.value.length = 0
    setInitialPaginationState()
  }

  const appendToList = (newList: T[]) => {
    const spliceFromIndex = list.value.length
    list.value.splice(
      spliceFromIndex,
      list.value.length + newList.length,
      ...(newList as UnwrapRef<T[]>)
    )
  }

  const updateTotalPagesAmount = () => {
    paginationState.value.totalPages = Math.floor((list.value.length - 1) / itemsPerPage.value)
  }

  const handleCurrentPage = () => {
    if (list.value.length && list.value.length % itemsPerPage.value === 0) {
      paginationState.value.currentPage = Math.max(0, paginationState.value.currentPage - 1)
    }
  }

  const handleItemsPerPage = (newVal: number) => {
    itemsPerPage.value = newVal
    updateTotalPagesAmount()
  }

  const setCurrentPage = (page: number) => {
    if (page >= 0 && page <= paginationState.value.totalPages) {
      paginationState.value.currentPage = page
    }
  }

  const toNextPage = () => {
    setCurrentPage(paginationState.value.currentPage + 1)
  }

  const toPrevPage = () => {
    setCurrentPage(paginationState.value.currentPage - 1)
  }

  const formattedList = computed(() =>
    list.value.slice(
      paginationState.value.currentPage * itemsPerPage.value,
      (paginationState.value.currentPage + 1) * itemsPerPage.value
    )
  )
  const isListNotEmpty = computed(() => !!list.value.length)

  const isReachedUpdateThreshold = computed(
    () =>
      paginationState.value.totalPages - paginationState.value.currentPage ===
      paginationState.value.updateThreshold
  )

  const checkListFromCache = (key: string) => {
    if (localStorageService.getItem(key)) {
      list.value = safeParseJson<T[]>(localStorageService.getItem(key)) as UnwrapRef<T[]>;
    }
  };

  return {
    //state
    list,
    itemsPerPage,
    paginationState,
    //methods
    resetState,
    appendToList,
    updateTotalPagesAmount,
    handleCurrentPage,
    handleItemsPerPage,
    toPrevPage,
    toNextPage,
    checkListFromCache,
    //computed
    formattedList,
    isListNotEmpty,
    isReachedUpdateThreshold
  }
}
