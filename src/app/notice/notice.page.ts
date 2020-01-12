import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  isloading = false
  notice_flag = null
  allNotice = []
  mosque_id = null
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public storage: Storage,
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
    //const mosque_id = this.route.snapshot.paramMap.get('id');

    this.storage.get('user_id').then((userID)=>{
      //console.log("uuu_id",userID);
      if(userID != null){
        this.mosqueService.getPref(userID).subscribe(res=>{
          console.log('hhhhh',res)
          //this.prefarble = res.mosque_id
          this.mosque_id = res.mosque_id;
          this.mosqueService.getNotice(this.mosque_id).subscribe((res)=>{
            console.log(res.mosque_notice);
            if(res){
              this.allNotice = res.mosque_notice
            }
            
            this.isloading = false
            this.loadingCtrl.dismiss();
          })
        })
      }
      
    })
    
  }
  goBack(){
    this.router.navigateByUrl('/')
  }

}
