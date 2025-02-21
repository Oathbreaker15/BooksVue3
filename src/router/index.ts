import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/SearchView.vue'
import FavsView from '@/views/FavsView.vue'
import HomeView from '@/views/HomeView.vue'
import CardView from '@/views/SelectedCardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Books',
        metaTags: [
          { name: 'description', content: 'Находите и добавляйте в избранное любимые книги.' },
          { name: 'keywords', content: 'книги, коллекция книг, хранилище книг' }
        ]
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        title: 'Books - Страница поиска',
        metaTags: [{ name: 'description', content: 'Страница поиска приложения Books.' }]
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavsView,
      meta: {
        title: 'Books - Страница избранного',
        metaTags: [{ name: 'description', content: 'Страница избранного приложения Books.' }]
      }
    },
    {
      path: '/card/:id',
      name: 'Card',
      component: CardView,
      props: true
    }
  ]
})

export default router
