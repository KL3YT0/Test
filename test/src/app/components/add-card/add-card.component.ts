import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { CardBlank } from 'src/app/models/cards.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<AddCardComponent>) {}

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    completedAt: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  addCard() {
    const { title, completedAt, description } = this.form.value;

    console.log(completedAt)

    this.matDialogRef.close({ title, completedAt, description });
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}
