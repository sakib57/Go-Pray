import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selecttheme',
  templateUrl: './selecttheme.page.html',
  styleUrls: ['./selecttheme.page.scss'],
})
export class SelectthemePage implements OnInit {
  dataAvailable= false
  theme = ''
  mosque_id = null
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    
  }


  ionViewWillEnter(){
    this.mosque_id = this.route.snapshot.paramMap.get('id');

    this.mosqueService.getTheme(this.mosque_id).subscribe((res)=>{
      console.log(res)
      if(res.status == 200){
        this.theme = res.active_theme_id
        console.log(this.theme)
        this.dataAvailable = true
      }
      
    })
  }

  change(event){
    this.mosqueService.updateTheme(this.mosque_id,event).subscribe((res)=>{

      console.log(res);
      if(res.status != 200){
        this.presentAlert('This mosque is no longer avilable').then(()=>{
          this.router.navigateByUrl('/user-mosque-list')
        })
      }
    })
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      //subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
