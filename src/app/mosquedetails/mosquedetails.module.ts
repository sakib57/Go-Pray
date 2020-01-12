import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MosquedetailsPage } from './mosquedetails.page';

const routes: Routes = [
  {
    path: '',
    component: MosquedetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MosquedetailsPage]
})
export class MosquedetailsPageModule {
   z

  
}
 