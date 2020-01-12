import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { LocationService } from '../services/location.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profileinfo',
  templateUrl: './profileinfo.page.html',
  styleUrls: ['./profileinfo.page.scss'],
})
export class ProfileinfoPage implements OnInit {

  dataAvailable = false
  isloading = false
  notice_flag = null
  mosque_id = null
  alllocation: any = [];

  mosqueDetail = {
    mosque_details:{
      name : '',
      description: '',
      address: '',
      location: '',
      latitude: '',
      longitude: '',
      description_flag: '',
      doa_flag: '',
      notice_flag: '',
      prayer_time_flag: '',
    }
  } 
  setlocation2 = { desc: '', place_id: '',lat: '', lng: '' };
  searchTerm = ''
  isItemAvailable: boolean = false;
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public locationService: LocationService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
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

    this.mosque_id = this.route.snapshot.paramMap.get('id');
    console.log(this.mosque_id)
    this.mosqueService.msqDetail(this.mosque_id).subscribe(res=>{
      //console.log(res.mosque_details.name);
      console.log(res)
      if(res.status == 200){
        this.mosqueDetail = res
        this.searchTerm = res.mosque_details.address
        console.log(this.mosqueDetail)
        this.isloading = false
        this.loadingCtrl.dismiss();
        this.dataAvailable = true
      }else{
        this.isloading = false
        this.loadingCtrl.dismiss()
      }
    })
  }

  onSubmit(form){
    if(form.valid){
      console.log(form.value)
      let latt = null
      if(this.setlocation2.lat == ''){
        latt = this.mosqueDetail.mosque_details.latitude
      }else{
        latt = this.setlocation2.lat
      }

      let lngg = null
      if(this.setlocation2.lng == ''){
        lngg = this.mosqueDetail.mosque_details.longitude
      }else{
        lngg = this.setlocation2.lng
      }

      let n_f
      let ds_f
      let do_f
      let p_f
      if(form.value.notice){
        n_f = "1"
      }else{
        n_f = "0"
      }

      if(form.value.about){
        ds_f = "1"
      }else{
        ds_f = "0"
      }

      if(form.value.doa){
        do_f = "1"
      }else{
        do_f = "0"
      }

      if(form.value.prayer){
        p_f = "1"
      }else{
        p_f = "0"
      }


      this.mosqueService.updateMosque(this.mosque_id,form.value.name,form.value.desc,form.value.addr,latt,lngg,ds_f,do_f,p_f,n_f,).subscribe((res)=>{
        if(res.status == 200){
          this.router.navigate(['mosquedashboard',this.mosque_id])
        }else{
          console.log('update error')
          this.presentAlert('Unable ti update')
        }
      })
    }else{
        console.log('validation failed')
        this.presentAlert('Please fill up all field')
    }
    
  }

  filterItems(ev: any) {
    let val = ev.target.value;
    var len = val.length
    this.isItemAvailable = true;
    var myItem = [];
    
    this.locationService.getLocation(val).subscribe((res)=>{
      //console.log(res);
      this.alllocation = res
    })
  }

  onCancel(sdfs) {
    // this.setItems()
  }
  locationClick(item) {
    if(item){
      this.setlocation2.desc = item.description;
      this.setlocation2.place_id = item.place_id;
      this.setlocation2.lat = item.latitude;
      this.setlocation2.lng = item.longitude;
    }
    this.searchTerm = item.description;
    this.alllocation = [];
    //console.log(this.setlocation2.desc)
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
