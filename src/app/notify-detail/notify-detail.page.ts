import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { Events, AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notify-detail',
  templateUrl: './notify-detail.page.html',
  styleUrls: ['./notify-detail.page.scss'],
})
export class NotifyDetailPage implements OnInit {

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
  }

  ionViewWillEnter(){
    this.isloading = true
    this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEL)=>{
      loadingEL.present();
    })

    this.events.subscribe('event_notice',(res)=>{
      this.title = res.title
      this.notice = res.notice
    })
    const notice_id = this.route.snapshot.paramMap.get('id');
    this.mosqueService.getNoticeDetail(notice_id).subscribe((res)=>{
      if(res){
        console.log(res.notice.title);
        this.title = res.notice.title
        this.notice = res.notice.notice
        this.id = res.notice.id
      }
      this.isloading = false
      this.loadingCtrl.dismiss();

      
    })
  }

}
