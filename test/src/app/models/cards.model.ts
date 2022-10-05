export interface CardBlank {
  title: string;
  completedAt: string;
  description: string;
}

export interface Card extends CardBlank {
  id: number;
  createdAt: string;
}
