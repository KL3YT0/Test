import { BehaviorSubject, max } from 'rxjs';
import { Injectable } from '@angular/core';

interface CardBlank {
  title: string;
  completedAt: string;
  description: string;
}

interface Card extends CardBlank {
  id: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
class CardsServise {
  constructor() {
    this.setCards(this.getLocalStorage() ?? []);
  }

  private cardsSource$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  cards = this.cardsSource$.asObservable();

  getCards(): Card[] {
    return this.cardsSource$.getValue();
  }

  setCards(cards: Card[]) {
    this.cardsSource$.next(cards);
  }

  addCard(card: CardBlank) {
    const createdAt = Date.now().toString();
    const id = this.getMaxId();

    this.cardsSource$.next([...this.getCards(), { ...card, createdAt, id }]);
  }

  copyCard(id: number) {
    const copied = this.getCards().find((card) => card.id === id);

    if (!copied) return;

    const { title, description, completedAt } = copied;

    this.addCard({ title, description, completedAt });
  }

  removeCard(id: number) {
    this.cardsSource$.next(
      this.getCards().filter((card) => {
        card.id !== id;
      })
    );
  }

  getMaxId(): number {
    let maxId = 0;

    this.getCards().forEach((card) => {
      maxId = card.id > maxId ? card.id : maxId;
    });

    return maxId;
  }

  saveLocalStorage(): void {
    localStorage.setItem('cards', JSON.stringify(this.getCards()));
  }

  getLocalStorage(): Card[] | null {
    const cards = localStorage.getItem('cards');

    if (!cards) {
      return null;
    }

    return JSON.parse(cards);
  }
}

export { CardsServise };
