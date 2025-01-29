import { ref, computed } from 'vue';
import type { UnwrapRefSimple } from '@vue/reactivity';

interface IPaginationState {
  currentPage: number,
  totalPages: number
}

interface IPaginationOptions {
  initialItemsOnPageCnt?: number
}

export function usePagination<T>(options: IPaginationOptions = {}) {
  const state = ref({
    list: [] as T[],
    itemsPerPage: options.initialItemsOnPageCnt ?? 6,
    paginationState: {
      currentPage: 0,
      totalPages: 0
    } as IPaginationState
  })

  const resetState = () => {
    // state.value.list = []
    state.value.list.length = 0;
    state.value.paginationState.currentPage = 0;
    state.value.paginationState.totalPages = 0;
  }

  const updateList = (newList: T[]) => {
    console.log(newList);
    console.log(state.value.list.length);
    
    
    // state.value.list = [...newList] as UnwrapRefSimple<T>[];
    state.value.list.splice(0, 0, [...newList]);
  }


  const updateTotalPagesAmount = () => {
    state.value.paginationState.totalPages = Math.floor((state.value.list.length-1) / state.value.itemsPerPage); 
  }

  const handleCurrentPage = () => {
    if (state.value.list.length && state.value.list.length % state.value.itemsPerPage === 0) {
      state.value.paginationState.currentPage = Math.max(0, state.value.paginationState.currentPage - 1);
    }
  }

  const handleItemsPerPage = (newVal: number) => {
    state.value.itemsPerPage = newVal;
    updateTotalPagesAmount();
  }

  const setCurrentPage = (page: number) => {
    state.value.paginationState.currentPage = page;
  }

  const toNextPage = () => {
    setCurrentPage(state.value.paginationState.currentPage+1);
  }

  const toPrevPage = () => {
    setCurrentPage(state.value.paginationState.currentPage-1);
  }

  const formattedList = computed(() => state.value.list.slice(state.value.paginationState.currentPage * state.value.itemsPerPage, (state.value.paginationState.currentPage+1) * state.value.itemsPerPage));
  const isListNotEmpty = computed(() => !!state.value.list.length);

  return {
    //state
    list: state.value.list,
    itemsPerPage: state.value.itemsPerPage,
    paginationState: state.value.paginationState,
    //methods
    resetState,
    updateList,
    updateTotalPagesAmount,
    handleCurrentPage,
    handleItemsPerPage,
    toPrevPage,
    toNextPage,
    //computed
    formattedList,
    isListNotEmpty
  }
}