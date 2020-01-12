import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserMosqueListPage } from './user-mosque-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserMosqueListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserMosqueListPage]
})
export class UserMosqueListPageModule {}
