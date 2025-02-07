import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { SelectedCard } from '@/interfaces/selectedCard';
import type { Card } from '@/types/card/card';
import { camalizeCardKeys } from '@/composition/camalizeCardKeys';
import { API_URL } from '@/services/api';

export const selectedCardStore = defineStore('selectedCard', () => {
  const initialCardData = ref<Card | null>(null);
  const selectedCard = ref<SelectedCard | null>(null);
  const selectedCardId = ref<string>('');

  const addToSelected = (book: SelectedCard) => {
    selectedCard.value = book;
  }

  const setId = (id: string) => {
    selectedCardId.value = id;
  }

  const setInitialCardData = (card: Card) => {
    initialCardData.value = card;
  }

  const prepareBeforeFetch = (card: Card) => {
    setInitialCardData(card);
    setId(card.key.replace('/works/', ''));
  }

  const fetchBook = async () => {
    try {
      const [res, bookRes] = await Promise.all([
        fetch(`${API_URL}/works/${selectedCardId.value}.json`),
        fetch(`${API_URL}/books/${selectedCardId.value}.json`)
      ]);

      if (!res.ok || !bookRes.ok) throw new Error('Search request failed');

      const [result, bookResult] = await Promise.all([res.json(), bookRes.json()]);

      const book = camalizeCardKeys<SelectedCard>({
        author_name: initialCardData.value?.authorName[0],
        number_of_pages: bookResult.number_of_pages,
        ...result,
        ...initialCardData.value
      });

      addToSelected(book);
    } catch (error) {
      console.error(error);
    }
  }

  const clearSelectedCard = () => {
    selectedCard.value = null;
    selectedCardId.value = '';
    initialCardData.value = null;
  }

  const getSelectedCardId = computed(() => selectedCardId.value);

  return {
    selectedCard,
    getSelectedCardId,
    prepareBeforeFetch,
    fetchBook,
    clearSelectedCard
  }
});