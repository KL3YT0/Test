import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardsViewComponent } from './components/screens/cards-view/cards-view.component';
import { EditorComponent } from './components/screens/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
  },
  {
    path: 'view',
    component: CardsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  title = '123';
}
