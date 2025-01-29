interface IHandleItemsPerPage {
  handleItemsPerPage(amountPerPage: number): void
}

// Константы для лучшей читаемости и поддерживаемости
const BREAKPOINT_WIDTH = 1316;
const ITEMS_MOBILE = 6;
const ITEMS_DESKTOP = 8;

function handleItemsPerPage(store: IHandleItemsPerPage) {
  if (window.innerWidth < BREAKPOINT_WIDTH) {
    store.handleItemsPerPage(ITEMS_MOBILE);
  } else {
    store.handleItemsPerPage(ITEMS_DESKTOP);
  }
}

function initResizeHandler(store: IHandleItemsPerPage) {
  // Добавляем debounce для оптимизации производительности
  let timeoutId: number;
  
  const debouncedHandler = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      handleItemsPerPage(store);
    }, 150);
  };

  window.addEventListener('resize', debouncedHandler);
  handleItemsPerPage(store);

  // Возвращаем функцию очистки
  return () => {
    window.removeEventListener('resize', debouncedHandler);
    clearTimeout(timeoutId);
  };
}

export {initResizeHandler};
