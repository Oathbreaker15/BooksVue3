import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectedCard } from '@/interfaces/selectedCard'
import type { Card } from '@/types/card/card'
import { localStorageService } from '@/services/localStorage'
import { safeParseJson } from '@/utils/localStorageUtils'
import { SearchService } from '@/services/api'

export const selectedCardStore = defineStore('selectedCard', () => {
  const initialCardData = ref<Card | null>(null)
  const selectedCard = ref<SelectedCard | null>(
    safeParseJson<SelectedCard>(localStorageService.getItem('selectedCard'))
  )

  const setSelectedCard = (card: SelectedCard) => {
    selectedCard.value = card
  }

  const fetchSelectedCard = async (cardId: string) => {
    if (selectedCard.value !== null) return

    try {
      const book = await SearchService.searchSelectedBook(cardId)
      setSelectedCard(book)
    } catch (error) {
      console.error(error)
    }
  }

  const clearSelectedCard = () => {
    selectedCard.value = null
    localStorageService.removeItem('selectedId')
    initialCardData.value = null
  }

  const fetchNewSelectedCard = async (cardId: string) => {
    clearSelectedCard()
    await fetchSelectedCard(cardId)
  }

  return {
    selectedCard,
    fetchSelectedCard,
    fetchNewSelectedCard,
    clearSelectedCard
  }
})
