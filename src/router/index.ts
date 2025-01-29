import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/SearchView.vue';
import FavsView from '@/views/FavsView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavsView
    }
  ]
})

export default router;
