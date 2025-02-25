import { createRouter, createWebHistory } from 'vue-router'

const SearchView = () => import('@/views/SearchView.vue')
const FavsView = () => import('@/views/FavsView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const SelectedCardView = () => import('@/views/SelectedCardView.vue')

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
      component: SelectedCardView,
      props: true
    }
  ]
})

export default router
