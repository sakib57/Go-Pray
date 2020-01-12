import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { Events, AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-noticedetails',
  templateUrl: './noticedetails.page.html',
  styleUrls: ['./noticedetails.page.scss'],
})
export class NoticedetailsPage implements OnInit {
dataAvailable = false
title = ''
notice = ''
id = null
mosque_id =  null
isloading = false
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public events: Events,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      console.log(res)
      this.mosque_id = res.mosque_id
    })
  }
  ionViewWillEnter(){
    this.isloading = true
    this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEL)=>{
      loadingEL.present();
    })

    this.events.subscribe('event_notice',(res)=>{
      if(res){
        this.title = res.title
        this.notice = res.notice
        this.dataAvailable = true
      }
    })
    const notice_id = this.route.snapshot.paramMap.get('id');
    this.mosqueService.getNoticeDetail(notice_id).subscribe((res)=>{
      console.log(res)
      if(res.status == 200){
        console.log(res.notice.title);
        this.title = res.notice.title
        this.notice = res.notice.notice
        this.id = res.notice.id
        this.isloading = false
        this.loadingCtrl.dismiss();
        this.dataAvailable = true
      }else{
        this.isloading = false
        this.loadingCtrl.dismiss()
      }
      

      
    })
  }

  deleteNotice(){
    this.mosqueService.deleteNotice(this.id).subscribe((res)=>{
      console.log(res);
      this.presentToast("Notice Deleted!")
      this.router.navigate(['notification',this.mosque_id])
      
    })
  }
  async OnDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to delete this notice?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteNotice();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
