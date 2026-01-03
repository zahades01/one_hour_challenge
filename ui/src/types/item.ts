export interface Item {
  id: string;
  name: string;
  effort: number;
  impact: number;
  urgency: number;
}

export interface ScoredItem extends Item {
  score: number;
}
