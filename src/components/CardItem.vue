<script setup lang="ts">
import { computed, ref } from 'vue'
import { favsStore } from '@/stores/favs'
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
const isBookSelected = ref(isBookInFavs(card))

const imgLink = computed(() => {
  return card.coverEditionKey ? `${COVER_URL}/b/olid/${card.coverEditionKey}-M.jpg` : bookImg
})

const favBooksIndex = computed(() => getFavBookIndex(card))

const cardId = card.key.replace('/works/', '')

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
  <RouterLink :to="{ name: 'Card', params: { id: cardId } }">
    <article class="books-item">
      <div class="books-item__img-wrapper">
        <img
          class="books-item__img"
          :src="imgLink"
          :alt="card.title"
          loading="lazy"
          @error="handleImageError"
        />
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
    width: 100%;
    height: 100%;
    max-height: 384px;
    min-height: 384px;

    &-wrapper {
      padding: 12px;
      box-sizing: border-box;
      background: $book-item-background-color;
    }
  }

  &__content {
    padding: 12px 10px;
    background: $main-color;
    color: $white-color;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
  }

  @media screen and (min-width: 1095px) {
    &__content {
      bottom: -68px;
      transition: bottom 0.2s ease-out;
    }
  }

  @media screen and (max-width: 1095px) {
    &__content {
      bottom: 0;
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
      background: $main-color;
      border: 2px solid $white-color;
      border-radius: 6px;
      margin-top: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      @media screen and (min-width: 1095px) {
        &:hover {
          background-color: $white-color;

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
        background-color: $white-color;

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
      background-color: $main-color;
      color: $white-color;
      border-radius: 8px;
      border: 2px solid transparent;
      cursor: pointer;

      @media screen and (min-width: 1095px) {
        &:hover {
          background-color: $white-color;
          color: $main-color;
          border-color: $main-color;
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
  border: 2px solid $main-color;
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
      background-color: $main-color;
      color: $white-color;
    }
  }
}
</style>
