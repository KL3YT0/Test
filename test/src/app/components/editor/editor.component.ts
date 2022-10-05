import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CardsServise } from 'src/app/services/cards.service';
import { Card, CardBlank, Mode } from 'src/app/models/cards.model';
import { AddCardComponent } from 'src/app/components/add-card/add-card.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  constructor(private cardService: CardsServise, private addCardModal: MatDialog) {}

  ngOnInit(): void {}

  openAddCardModal() {
    const addCardModalRef = this.addCardModal.open(AddCardComponent, {
      data: {
        modalTitle: 'Добавление карточки',
        mode: Mode.EDIT,
      }
    });

    addCardModalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCard(result);
      }
    });
  }

  getCards() {
    return this.cardService.getCards();
  }

  addCard(card: Card) {
    this.cardService.addCard(card);
  }

  removeCard(id: number) {
    this.cardService.removeCard(id);
  }

  copyCard(id: number) {
    this.cardService.copyCard(id);
  }
}
