<script setup lang="ts">
import { computed, ref } from 'vue'
import { favsStore } from '@/stores/favs'
import { selectedCardStore } from '@/stores/selectedCard'
import type { Card } from '@/types/card/card'
import bookImg from '@/assets/icons/black-book.svg'
import { RouterLink } from 'vue-router'
import { COVER_URL } from '@/services/api'

interface IProps {
  card: Card
}

const props = defineProps<IProps>()
const { card } = props
const { removeFromFavs, addToFavs, getFavBookIndex, isBookInFavs } = favsStore()
const selectedCard = selectedCardStore()
const { fetchNewSelectedCard } = selectedCard
const isBookSelected = ref(isBookInFavs(card))

const imgLink = computed(() => {
  return card.coverEditionKey ? `${COVER_URL}/b/olid/${card.coverEditionKey}-M.jpg` : bookImg
})

const favBooksIndex = computed(() => getFavBookIndex(card))

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = bookImg
}

const toggleFavorite = () => {
  isBookSelected.value ? removeFromFavs(favBooksIndex.value) : addToFavs(card)

  isBookSelected.value = isBookInFavs(card)
}
</script>

<template>
  <RouterLink to="/card">
    <article @click="fetchNewSelectedCard(card)" class="books-item">
      <div class="books-item__img">
        <img :src="imgLink" :alt="card.title" loading="lazy" @error="handleImageError" />
      </div>

      <section class="books-item__content">
        <section class="books-item__content-info">
          <h2 class="books-item__content-info-title">{{ card.title }}</h2>
          <p class="books-item__content-info-author">
            {{ card.authorName?.[0] ?? 'Автор не указан' }}
          </p>
        </section>

        <button
          @click.prevent.stop="toggleFavorite"
          :class="`books-item__content-fav-btn${isBookSelected ? '_active' : ''}`"
          :aria-label="isBookSelected ? 'Удалить из избранного' : 'Добавить в избранное'"
        ></button>
      </section>
    </article>
  </RouterLink>
</template>

<style scoped lang="scss">
@import '@/styles/vars.scss';

.books-item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0 16px 24px 0 rgba(0, 13, 51, 0.2);

    .books-item__content {
      bottom: 0;
    }
  }

  &__img {
    padding: 12px;
    box-sizing: border-box;
    background: $book-item-background;

    img {
      width: 100%;
      height: 100%;
      max-height: 384px;
      min-height: 384px;
    }
  }

  @media screen and (min-width: 1095px) {
    &__content {
      padding: 12px 10px;
      background: $main;
      color: $white;
      position: absolute;
      bottom: -68px;
      width: 100%;
      box-sizing: border-box;
      transition: bottom 0.2s ease-out;
    }
  }

  @media screen and (max-width: 1095px) {
    &__content {
      padding: 12px 10px;
      background: $main;
      color: $white;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }

  &__content {
    &-info-genre,
    &-info-title {
      margin: 0;
    }

    &-info-genre {
      margin-bottom: 4px;
    }

    &-info-title {
      font-weight: 600;
      height: 48px;
      overflow: hidden;
      line-height: 1.1em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    &-fav-btn,
    &-fav-btn_active {
      width: 36px;
      height: 32px;
      background: $main;
      border: 2px solid $white;
      border-radius: 6px;
      margin-top: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      @media screen and (min-width: 1095px) {
        &:hover {
          background-color: $white;

          &::before {
            background: url(@/assets/icons/favorite-white.svg);
          }
        }
      }

      &:active {
        background: #bbb;
      }

      &::before {
        content: '';
        width: 20px;
        height: 20px;
        background: url(@/assets/icons/favorite-black.svg) no-repeat 0 0;
      }

      &_active {
        background-color: $white;

        &::before {
          background: url(@/assets/icons/favorite-white.svg);
        }
      }
    }
  }
}

.books-item__content-info-author {
  margin-top: 8px;
}

.book-page__info {
  display: flex;

  img {
    max-width: 165px;
    max-height: 214px;
    width: 100%;
    height: 100%;
    margin-right: 20px;
  }

  &-content {
    display: flex;
    flex-direction: column;

    &-item {
      margin-bottom: 8px;

      &-value {
        font-weight: 600;
      }
    }

    &-fav-btn {
      width: 160px;
      height: 40px;
      background-color: $main;
      color: $white;
      border-radius: 8px;
      border: 2px solid transparent;
      cursor: pointer;

      @media screen and (min-width: 1095px) {
        &:hover {
          background-color: $white;
          color: $main;
          border-color: $main;
        }
      }
    }
  }
}

.book-page__description {
  display: flex;
  flex-direction: column;

  &-header {
    line-height: 32px;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 8px;
  }
}

.book-page__tag {
  box-sizing: border-box;
  padding: 6px;
  border-radius: 8px;
  border: 2px solid $main;
  cursor: pointer;

  &s {
    &-inner {
      display: flex;
      gap: 12px;
    }

    &-header {
      line-height: 32px;
      margin: 0;
      margin-top: 20px;
      margin-bottom: 8px;
    }
  }

  @media screen and (min-width: 1095px) {
    &:hover {
      background-color: $main;
      color: $white;
    }
  }
}
</style>
