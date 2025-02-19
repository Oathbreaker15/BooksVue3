<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { selectedCardStore } from '@/stores/selectedCard'
import bookImg from '@/assets/icons/black-book.svg'
import LoadingAnimation from '@/components/loadingAnimation.vue'
import { favsStore } from '@/stores/favs'
import type { Card } from '@/types/card/card'
import { COVER_URL } from '@/services/api'

const { selectedCard } = storeToRefs(selectedCardStore())
const { removeFromFavs, addToFavs, isBookInFavs, getFavBookIndex } = favsStore()
const authorsShowLimit = 2
const tagsShowLimit = 5

const imgLink = computed(() => {
  return selectedCard.value?.coverEditionKey
    ? `${COVER_URL}/b/olid/${selectedCard.value?.coverEditionKey}-M.jpg`
    : bookImg
})

const isFav = computed(() => isBookInFavs(selectedCard.value as Card))
const descriptionHandler = computed(() =>
  typeof selectedCard.value?.description === 'string'
    ? selectedCard.value?.description
    : selectedCard.value?.description?.value
)
</script>

<template>
  <transition-group name="fade">
    <LoadingAnimation v-if="selectedCard === null" :text="'ЗАГРУЗКА'" key="1" />

    <acticle v-else class="book-card" key="2">
      <h2 class="book-card__header">{{ selectedCard.title }}</h2>

      <section class="book-card__content">
        <img class="book-card__img" :src="imgLink" :alt="selectedCard.title" />

        <section class="book-card__info">
          <div v-if="selectedCard.authorName?.length === 1" class="book-card__info-author">
            Автор: <span class="__bold">{{ selectedCard.authorName[0] }}</span>
          </div>

          <div v-else class="book-card__info-author">
            Авторы:
            <span
              v-for="(author, i) in selectedCard.authorName.slice(0, authorsShowLimit)"
              :key="i"
            >
              <span class="__bold">{{ author }}</span
              ><span v-if="i !== authorsShowLimit">,</span>
            </span>
          </div>

          <div v-if="selectedCard.subjects?.length" class="book-card__info-genre">
            Жанр: <span class="__bold">{{ selectedCard.subjects[0] }}</span>
          </div>

          <div v-if="selectedCard.revision" class="book-card__info-revision">
            Редакция: <span class="__bold">{{ selectedCard.revision }}</span>
          </div>

          <div v-if="selectedCard.numberOfPages" class="book-card__info-pages">
            Количество страниц: <span class="__bold">{{ selectedCard.numberOfPages }}</span>
          </div>

          <button
            @click="isFav ? removeFromFavs(getFavBookIndex(selectedCard)) : addToFavs(selectedCard)"
            class="book-card__info-fav-btn"
            :aria-label="isFav ? 'Удалить из избранного' : 'Добавить в избранное'"
          >
            {{ isFav ? 'Удалить из избранного' : 'В избранное' }}
          </button>
        </section>
      </section>

      <section v-if="descriptionHandler" class="book-card__description">
        <div class="book-card__description-title __bold">Описание:</div>
        <p class="book-card__description-text">{{ descriptionHandler }}</p>
      </section>

      <section v-if="selectedCard.subjects?.length" class="book-card__tags-content">
        <div class="book-card__tags-title __bold">Теги:</div>

        <div class="book-card__tags">
          <span
            v-for="(subject, i) in selectedCard.subjects?.slice(0, tagsShowLimit)"
            :key="i"
            class="book-card__tags-subject"
          >
            {{ subject }}
          </span>
        </div>
      </section>
    </acticle>
  </transition-group>
</template>

<style scoped lang="scss">
@import '@/styles/vars.scss';

.book-card {
  &__header {
    font-size: 24px;
    line-height: 32px;
  }

  &__content {
    display: flex;
    gap: 20px;
  }

  &__img {
    border-radius: 8px;
    width: 165px;
    height: 214px;
    background: $book-item-background;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__info > * {
    line-height: 22px;
  }

  &__info-genre,
  &__info-revision,
  &__info-pages {
    margin-top: 12px;
  }

  &__info-fav-btn {
    box-sizing: border-box;
    margin-top: auto;
    width: 162px;
    height: 40px;
    border-radius: 8px;
    color: $white;
    background-color: $main;
    border: 2px solid transparent;

    @media (min-width: 1095px) {
      &:hover {
        cursor: pointer;
        background: $white;
        color: $main;
        border-color: $main;
      }
    }

    &:active {
      background: $book-item-background;
    }
  }

  &__description {
    margin-top: 20px;

    &-text {
      margin: 0;
    }
  }

  &__tags {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    text-transform: capitalize;
    flex-wrap: wrap;
    padding-bottom: 20px;

    &-content {
      margin-top: 20px;
    }
  }

  &__tags-subject {
    box-sizing: border-box;
    padding: 8px;
    border: 2px solid black;
    border-radius: 8px;
  }
}

.__bold {
  font-weight: bold;
}

@media (max-width: 639px) {
  .book-card {
    padding: 0px;

    &__content {
      gap: 12px;
    }

    &__img {
      width: 35vw;
      max-width: 165px;
      height: 50vw;
    }
  }
}
</style>
