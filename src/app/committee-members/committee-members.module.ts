import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommitteeMembersPage } from './committee-members.page';

const routes: Routes = [
  {
    path: '',
    component: CommitteeMembersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommitteeMembersPage]
})
export class CommitteeMembersPageModule {}
