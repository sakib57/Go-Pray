import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrayerdetailsPage } from './prayerdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrayerdetailsPage]
})
export class PrayerdetailsPageModule {}
