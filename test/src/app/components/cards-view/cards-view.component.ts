import { PipeTransform, Pipe } from '@angular/core';
import { CardsServise } from 'src/app/services/cards.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { filter } from 'rxjs/operators';

import { Swap } from 'src/app/models/cards.model';
import { AddCardComponent } from 'src/app/components/add-card/add-card.component';
import { Mode } from 'src/app/models/cards.model';

@Component({
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.css'],
})
export class CardsViewComponent implements OnInit {
  constructor(private cardsService: CardsServise, private addCardModal: MatDialog) {}

  ngOnInit(): void {}

  titleQuery: string = '';

  getCards() {
    return this.titleQuery
      ? this.cardsService.getCards().filter((card) => card.title.toLowerCase().includes(this.titleQuery.toLowerCase()))
      : this.cardsService.getCards();
  }

  openAddCardModal(id: number) {
    const card = this.getCards().find((card) => card.id === id);

    if (!card) {
      return;
    }

    this.addCardModal.open(AddCardComponent, {
      data: {
        mode: Mode.VIEW,
        modalTitle: 'Просмотр карточки',
        title: card.title,
        completedAt: card.completedAt,
        description: card.description,
      },
    });
  }

  moveUp(id: number) {
    this.cardsService.swapCard(id, Swap.UP);
  }

  moveDown(id: number) {
    this.cardsService.swapCard(id, Swap.DOWN);
  }
}
