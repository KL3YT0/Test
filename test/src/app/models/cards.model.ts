export interface CardBlank {
  title: string;
  completedAt: string;
  description: string;
}

export interface Card extends CardBlank {
  id: number;
  createdAt: string;
}

export enum Swap {
  UP = 'up',
  DOWN = 'down',
}

export enum Mode {
  VIEW = 'view',
  EDIT = 'edit'
}

export interface Dialog extends Partial<CardBlank> {
  modalTitle: string;
  mode: Mode;
}