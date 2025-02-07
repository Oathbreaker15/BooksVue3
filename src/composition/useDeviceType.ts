import {ref, onMounted, onUnmounted} from 'vue';
import { useDebounce } from './useDebounce';

interface IDeviceTypeOptions {
  desktopBreakpoint?: number;
  tabletBreakpoint?: number;
  debounceTime?: number;
}

export function useDeviceType(options: IDeviceTypeOptions = {}) {
  const {
    desktopBreakpoint = 1096,
    tabletBreakpoint = 640,
    debounceTime = 100
  } = options;

  const isDesktop = ref(window.innerWidth >= desktopBreakpoint);
  const isTablet = ref(window.innerWidth < desktopBreakpoint && window.innerWidth >= tabletBreakpoint);
  const isMobile = ref(window.innerWidth < tabletBreakpoint);

  const handleDeviceType = useDebounce(() => {
    isDesktop.value = window.innerWidth >= desktopBreakpoint;
    isTablet.value = window.innerWidth < desktopBreakpoint && window.innerWidth >= tabletBreakpoint;
    isMobile.value = window.innerWidth < tabletBreakpoint;
  }, debounceTime);

  onMounted(() => {
    window.addEventListener('resize', handleDeviceType);
  });

  onUnmounted(()=>{
    window.removeEventListener('resize', handleDeviceType);
  })

  return {
    isDesktop,
    isTablet,
    isMobile
  }
}