import type {IHandleItemsPerPage} from '../interfaces/IHandleItemsPerPage';

function handleItemsPerPage(store: IHandleItemsPerPage) {
  window.innerWidth < 1316 ? store.handleItemsPerPage(6) : store.handleItemsPerPage(8);
}

function initResizeHandler(store: IHandleItemsPerPage) {
  window.addEventListener('resize', ()=>{
    handleItemsPerPage(store);
  })
  handleItemsPerPage(store);
}

export {initResizeHandler};
