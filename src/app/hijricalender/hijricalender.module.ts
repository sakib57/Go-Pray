import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { HijricalenderPage } from './hijricalender.page';

const routes: Routes = [
  {
    path: '',
    component: HijricalenderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgCalendarModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HijricalenderPage]
})
export class HijricalenderPageModule {}
