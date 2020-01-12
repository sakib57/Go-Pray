import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
 
import * as moment from 'moment';
@Component({
  selector: 'app-hijricalender',
  templateUrl: './hijricalender.page.html',
  styleUrls: ['./hijricalender.page.scss'],
})
export class HijricalenderPage implements OnInit {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
addEvent() { 
  }
  onEventSelected(event) { 
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  ngOnInit() {
  }

}
