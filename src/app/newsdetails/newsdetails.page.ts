import { Component, OnInit } from '@angular/core';
import { MosqueService } from '../services/mosque.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.page.html',
  styleUrls: ['./newsdetails.page.scss'],
})
export class NewsdetailsPage implements OnInit {

  isloading = false
  notice_flag = null
  mosque_id = null
  news = {
    id: null,
    title: '',
    sub_title: '',
    news: '',
    news_image: ''
  }
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public events: Events,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController
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
    const news_id = this.route.snapshot.paramMap.get('id');
    this.mosqueService.getNewsDetail(news_id).subscribe((res)=>{
      console.log(res);
      if(res){
        this.news.title = res.news.title
        this.news.id = res.news.id
        this.news.sub_title = res.news.sub_title
        this.news.news = res.news.news
        this.news.news_image = res.news.news_image
      }
      this.isloading = false
      this.loadingCtrl.dismiss();
      
    })
  }

  deleteNews(){
    this.mosqueService.deleteNews(this.news.id).subscribe((res)=>{
      console.log(res);
      this.presentToast("News Deleted!")
      this.router.navigate(['newslist',this.mosque_id])
      
    })
  }

  async OnDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to delete this news?',
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
            this.deleteNews();
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
