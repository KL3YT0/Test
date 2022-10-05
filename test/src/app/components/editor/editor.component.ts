import { Component, OnInit } from '@angular/core';
import { CardsServise } from 'src/app/services/cards.service';
import { Card, CardBlank } from 'src/app/models/cards.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  constructor(private cardService: CardsServise) {}

  ngOnInit(): void {}

  getCards() {
    return this.cardService.getCards();
  }

  addCard() {
    const date = new Date();
    const dateFormatted = this.formatDate(date);

    const card: CardBlank = {
      title: dateFormatted,
      completedAt: dateFormatted,
      description: dateFormatted,
    };

    this.cardService.addCard(card);
  }

  removeCard(id: number) {
    this.cardService.removeCard(id);
  }

  copyCard(id: number) {
    this.cardService.copyCard(id);
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0,10)
  }
}
