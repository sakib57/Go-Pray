import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  moreOption(){
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'More Options',
      message: 'Any further question, please contuct us: prayerapp@mail.com ',
      buttons: ['OK']
    });

    await alert.present();
  }

}
