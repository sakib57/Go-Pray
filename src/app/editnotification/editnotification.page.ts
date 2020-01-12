import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { Events, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editnotification',
  templateUrl: './editnotification.page.html',
  styleUrls: ['./editnotification.page.scss'],
})
export class EditnotificationPage implements OnInit {
  dataAvailable = false
  isloading = false
  data = {
    id: null,
    title: '',
    notice: ''
  }
  notice_flag = null
  mosque_id = null
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public events: Events,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      console.log('qqqqqq',res)
      //this.notice_flag = res.notice_flag
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

      console.log("www",res);
      if(res.status == 200){
        this.data.title = res.notice.title
        this.data.notice = res.notice.notice
        this.data.id = res.notice.id
        this.isloading = false
        this.loadingCtrl.dismiss();
        this.dataAvailable = true
      }else{
        this.isloading = false
        this.loadingCtrl.dismiss();
      }
    })
  }

  onSubmit(form){
    console.log(form.value)
    this.mosqueService.updateNotice(this.data.id,form.value.title,form.value.notice).subscribe((res)=>{
      console.log(res)
      if(res.status == 200){
        this.events.publish('event_notice',this.data);
        this.router.navigate(['noticedetails',this.data.id],{queryParams:{mosque_id:this.mosque_id}})
      }else{
        console.log('Update Error..!!')
        this.presentAlert().then(()=>{
          this.router.navigate(['/user-mosque-list'])
        })
        
      }
    
    })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Opps..!',
      subHeader: 'Update error',
      message: 'This notice no longer available',
      buttons: ['OK']
    });

    await alert.present();
  }

}
