import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  Events, 
  AlertController, 
  ToastController, 
  LoadingController 
} from '@ionic/angular';
import { MosqueService } from '../services/mosque.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {
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

    
    const notice_id = this.route.snapshot.paramMap.get('id');
    this.mosqueService.getNoticeDetail(notice_id).subscribe((res)=>{
      if(res){
        console.log(res.notice.title);
        this.title = res.notice.title
        this.notice = res.notice.notice
        this.id = res.notice.id
        this.dataAvailable = true
      }
      this.isloading = false
      this.loadingCtrl.dismiss();

      
    })
  }

  noticeList(){
    this.router.navigateByUrl('/notice')
  }

}
