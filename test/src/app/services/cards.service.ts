import { BehaviorSubject, max } from 'rxjs';
import { Injectable } from '@angular/core';
import { Card, CardBlank } from '../models/cards.model';
import { Swap } from '../models/cards.model';

const CARDS_KEY = 'cards';

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
    this.setLocalStorage();
  }

  addCard(card: CardBlank) {
    const createdAt = Date.now().toString();
    const id = this.getMaxId();

    this.setCards([...this.getCards(), { ...card, createdAt, id }]);
  }

  copyCard(id: number) {
    const copied = this.getCards().find((card) => card.id === id);

    if (!copied) return;

    const { title, description, completedAt } = copied;

    this.addCard({ title, description, completedAt });
  }

  removeCard(id: number) {
    this.setCards(this.getCards().filter((card) => card.id !== id));
  }

  getMaxId(): number {
    let maxId = 0;

    this.getCards().forEach((card) => {
      maxId = card.id > maxId ? card.id : maxId;
    });

    return ++maxId;
  }

  swapCard(id: number, swapAs: Swap) {
    const cards = this.getCards();

    const swappedIndex = cards.findIndex((card) => card.id === id);
    const swapped = cards[swappedIndex];

    const swappedWithIndex = swapAs === Swap.DOWN ? swappedIndex + 1 : swappedIndex - 1;
    const swappedWith = cards[swappedWithIndex];

    if (!swappedWith) {
      return;
    }

    cards[swappedIndex] = { ...swappedWith };
    cards[swappedWithIndex] = { ...swapped };

    this.setCards(cards);
  }

  setLocalStorage(): void {
    localStorage.setItem(CARDS_KEY, JSON.stringify(this.getCards()));
  }

  getLocalStorage(): Card[] | null {
    const cards = localStorage.getItem(CARDS_KEY);

    if (!cards) {
      return null;
    }

    return JSON.parse(cards);
  }
}

export { CardsServise };
