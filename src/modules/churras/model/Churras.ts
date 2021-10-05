import { ChurrasGuest } from "./Guest";

export interface ChurrasModel {
  id: string;
  name: string;
  description: string;
  date: Date;
  suggestedValues: SuggestedChurrasContribution
  guests: Array<ChurrasGuest>
}

export interface SuggestedChurrasContribution {
  regular: number;
  openBar: number;
}

