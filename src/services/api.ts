export const API_URL = 'http://localhost:5173/api/';
export const COVER_URL = 'https://covers.openlibrary.org';

export class SearchService {
  private static readonly BASE_URL = API_URL;
  
  public static async searchBooks(query: string, offset?: number) {
    const params = new URLSearchParams();
    params.append('q', query);
    if (offset) params.append('offset', offset.toString());

    const res = await fetch(`${this.BASE_URL}/search.json?${params.toString()}`);
    if (!res.ok) throw new Error('Search request failed');
    return res.json();
  }
}