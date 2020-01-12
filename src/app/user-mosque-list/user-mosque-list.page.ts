import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Events, LoadingController } from '@ionic/angular';
import { MosqueService } from '../services/mosque.service';
import { UserMosque } from '../models/user-mosque.model';

@Component({
  selector: 'app-user-mosque-list',
  templateUrl: './user-mosque-list.page.html',
  styleUrls: ['./user-mosque-list.page.scss'],
})
export class UserMosqueListPage implements OnInit {
  isloading = false

  mosques: []
  
  constructor(
    public events: Events, 
    private router: Router,
    public storage: Storage,
    public mosqueService: MosqueService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.isloading = true
    this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEL)=>{
      loadingEL.present();
    })
    this.storage.get('mosque_user_id').then((m_user)=>{
      this.mosqueService.userMosqueList(m_user).subscribe((res)=>{
        console.log(res);
        this.mosques = res.user_mosque_list
        this.isloading = false
        this.loadingCtrl.dismiss();
      })
    })
  }

  mosqUserLogout(){
    this.storage.remove('mosque_user_id');
    this.events.publish('mosque_user_id',0);
    this.router.navigateByUrl('tabs/tab5')
  }

}
