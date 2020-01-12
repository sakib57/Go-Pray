import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.page.html',
  styleUrls: ['./newslist.page.scss'],
})
export class NewslistPage implements OnInit {
  notice_flag = null
  allNews = []
  mosque_id = null
  isloading = false
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
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
    this.mosque_id = this.route.snapshot.paramMap.get('id');
    this.mosqueService.getNews(this.mosque_id).subscribe((res)=>{
      console.log(res.mosque_news);
      if(res){
        this.allNews = res.mosque_news
      }
      this.isloading = false
      this.loadingCtrl.dismiss();
      
    })
  }

  deleteNews(id,i){
    this.mosqueService.deleteNews(id).subscribe((res)=>{
      console.log(res);
      //this.router.navigateByUrl(`notification/${this.mosque_id}`)
      this.presentToast("News Deleted!")
      this.router.navigate(['newslist',this.mosque_id])
      if (i !== -1) {
        this.allNews.splice(i, 1);
      }
    })
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
            this.deleteNews(id,i);
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
