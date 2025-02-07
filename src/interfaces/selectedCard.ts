import type { Card } from '@/types/card/card';

export interface SelectedCard extends Card {
  numberOfPages: number,
  revision: number,
  description: string | {value: string},
  subjects: string[],
  covers: string[],
}