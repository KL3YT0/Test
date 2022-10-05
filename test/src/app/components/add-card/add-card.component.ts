import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlStatus } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardBlank, Mode } from 'src/app/models/cards.model';
import { Dialog } from 'src/app/models/cards.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<AddCardComponent>, @Inject(MAT_DIALOG_DATA) public data: Dialog) {}

  ngOnInit(): void {
    
  }

  form: FormGroup = new FormGroup({
    title: new FormControl(this.data.title ?? '', [Validators.required]),
    completedAt: new FormControl(this.data.completedAt ?? '', [Validators.required]),
    description: new FormControl(this.data.description ?? '', [Validators.required]),
  });

  addCard() {
    const { title, completedAt, description } = this.form.value;
    this.matDialogRef.close({ title, completedAt, description });
  }

  close() {
    this.matDialogRef.close(null);
  }

  get edited() {
    return this.data.mode === Mode.EDIT;
  }

  get formIsReady() {
    return this.form.status === 'VALID' && this.edited;
  }
}
