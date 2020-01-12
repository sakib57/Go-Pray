import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  isloading = false
  notice_flag = null
  allNotice = []
  mosque_id = null
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      console.log('qqqqqq',res)
      this.notice_flag = res.notice_flag
    })
  }
  ionViewWillEnter(){
    this.isloading = true
    this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEL)=>{
      //loadingEL.present();
    })
    const mosque_id = this.route.snapshot.paramMap.get('id');
    this.mosque_id = mosque_id;
    this.mosqueService.getNotice(mosque_id).subscribe((res)=>{
      console.log(res.mosque_notice);
      if(res){
        this.allNotice = res.mosque_notice
      }
      
      this.isloading = false
      this.loadingCtrl.dismiss();
    })
  }

  delete(id:any,i){
    //const index: number = this.data.indexOf(msg);
     
    console.log(id);
    this.mosqueService.deleteNotice(id).subscribe((res)=>{
      console.log(res);
      //this.router.navigateByUrl(`notification/${this.mosque_id}`)
      this.presentToast("Notice Deleted!")
      this.router.navigate(['notification',this.mosque_id],{queryParams:{notice_flag:this.notice_flag}})
    })
    //const index: number = this.allNotice.indexOf(id);
    if (i !== -1) {
      this.allNotice.splice(i, 1);
    }
  }

  async OnDelete(id,i) {
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
            this.delete(id,i);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async test(){
    const toast = await this.toastController.create({
      message: "Test",
      duration: 2000,
      cssClass: "my_custom_class"
    });
    toast.present();
  }

}
