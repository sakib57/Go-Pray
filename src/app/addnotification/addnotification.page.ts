import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addnotification',
  templateUrl: './addnotification.page.html',
  styleUrls: ['./addnotification.page.scss'],
})
export class AddnotificationPage implements OnInit {
  mosque_id = null

  notice_flag = null
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.mosque_id = this.route.snapshot.paramMap.get('id');
    

  }

  onsubmit(form){
    console.log(form.value);
    this.mosqueService.addNotice(this.mosque_id,form.value.title,form.value.notice).subscribe((res)=>{
      console.log(res);
      //this.router.navigateByUrl(`notification/${this.mosque_id}{queryParams:{notice_flag:this.notice_flag}}`)
      this.presentToast("Notice added successfully")
      this.router.navigate(['notification',this.mosque_id])
    })
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
