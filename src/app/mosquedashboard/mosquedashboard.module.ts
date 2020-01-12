import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MosquedashboardPage } from './mosquedashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MosquedashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MosquedashboardPage]
})
export class MosquedashboardPageModule {}
