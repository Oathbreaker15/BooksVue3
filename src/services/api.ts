const API_URL = 'https://openlibrary.org/search.json';

export class SearchService {
  private static readonly BASE_URL = API_URL;
  
  public static async searchBooks(query: string) {
    const res = await fetch(`${this.BASE_URL}?q=${query}`);
    if (!res.ok) throw new Error('Search request failed');
    return res.json();
  }
}