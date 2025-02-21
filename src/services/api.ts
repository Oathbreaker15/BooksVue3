export const API_URL = 'http://localhost:5173/api/'
export const COVER_URL = 'https://covers.openlibrary.org'
import { camalizeCardKeys } from '@/composition/camalizeCardKeys'
import type { Card } from '@/types/card/card'
import type { SelectedCard } from '@/interfaces/selectedCard'

export class SearchService {
  private static readonly BASE_URL = API_URL

  public static async searchBooks(query: string, offset?: number) {
    const params = new URLSearchParams()
    params.append('q', query)
    if (offset) params.append('offset', offset.toString())

    const res = await fetch(`${this.BASE_URL}/search.json?${params.toString()}`)
    if (!res.ok) throw new Error('Search request failed')
    return res.json()
  }

  public static async searchSelectedBook(cardId: string): Promise<SelectedCard> {
    const searchBooksResult = await this.searchBooks(cardId)

    const initialObj = searchBooksResult.docs.filter(
      (book: Card) => book.key.replace('/works/', '') === cardId
    )[0]

    const [res, bookRes] = await Promise.all([
      fetch(`${API_URL}/works/${cardId}.json`),
      fetch(`${API_URL}/books/${cardId}.json`)
    ])

    if (!res.ok || !bookRes.ok) throw new Error('Search request failed')

    const [result, bookResult] = await Promise.all([res.json(), bookRes.json()])

    const book = camalizeCardKeys<SelectedCard>({
      author_name: initialObj?.author_name[0],
      number_of_pages: bookResult.number_of_pages,
      ...result,
      ...initialObj
    })

    return book
  }
}
