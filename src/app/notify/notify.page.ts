import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MosqueService } from '../services/mosque.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {
  mosqueId = null
  hasData = false
  isLoading = true
  allNotice = []
  constructor(
    public storage: Storage,
    public events: Events,
    public mosqueService: MosqueService,
  ) { 
    this.events.subscribe('prefarble', (prefarble) => {
      if (prefarble) {
        //this.mosqueId = prefarble;
        this.getNotice(prefarble);
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_id').then((userID)=>{
      console.log("uuu_id",userID);
      if(userID){
        this.mosqueService.getPref(userID).subscribe(res=>{
          console.log(res)
          if(res.mosque_id != null){
            //this.mosqueId = res;
            this.getNotice(res.mosque_id);
            
          }else{
            this.isLoading = false
          }
        })
      }
    })
  }

  getNotice(id){
    console.log('msq_id',id)
    this.mosqueService.getNotice(id).subscribe((res)=>{
      console.log(res.mosque_notice);
      if(res.status == 200){
        console.log('res',res)
        this.allNotice = res.mosque_notice
        this.isLoading = false
        this.hasData = true
      }
      this.isLoading = false
    })
  }

}
