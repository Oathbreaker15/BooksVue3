import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectedCard } from '@/interfaces/selectedCard'
import type { Card } from '@/types/card/card'
import { camalizeCardKeys } from '@/composition/camalizeCardKeys'
import { API_URL } from '@/services/api'
import { localStorageService } from '@/services/localStorage'
import { safeParseJson } from '@/utils/localStorageUtils'

export const selectedCardStore = defineStore('selectedCard', () => {
  const initialCardData = ref<Card | null>(null)
  const selectedCard = ref<SelectedCard | null>(
    safeParseJson<SelectedCard>(localStorageService.getItem('selectedCard'))
  )

  const setSelectedCard = (card: SelectedCard) => {
    selectedCard.value = card
    localStorageService.setItem('selectedCard', JSON.stringify(selectedCard.value))
  }

  const prepareCardObj = (card: Card) => {
    initialCardData.value = {
      ...card,
      cardId: card.key.replace('/works/', '')
    }
  }

  const fetchSelectedCard = async () => {
    if (selectedCard.value !== null) return

    try {
      const [res, bookRes] = await Promise.all([
        fetch(`${API_URL}/works/${initialCardData.value?.cardId}.json`),
        fetch(`${API_URL}/books/${initialCardData.value?.cardId}.json`)
      ])

      if (!res.ok || !bookRes.ok) throw new Error('Search request failed')

      const [result, bookResult] = await Promise.all([res.json(), bookRes.json()])

      const book = camalizeCardKeys<SelectedCard>({
        author_name: initialCardData.value?.authorName[0],
        number_of_pages: bookResult.number_of_pages,
        ...result,
        ...initialCardData.value
      })

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

  const fetchNewSelectedCard = async (card: Card) => {
    clearSelectedCard()
    prepareCardObj(card)
    await fetchSelectedCard()
  }

  return {
    selectedCard,
    prepareCardObj,
    fetchSelectedCard,
    fetchNewSelectedCard,
    clearSelectedCard
  }
})
