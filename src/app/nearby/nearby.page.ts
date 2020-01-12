import { Component, OnInit } from '@angular/core';
import { MosqueService } from '../services/mosque.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  //place_id = 'asdf'
  lattitude = -33.865143
  longitude = 151.209900

allNearbyMosque: any = [];

  constructor(
    public mosqueService: MosqueService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    // console.log("Lat from TS",this.lattitude)
    // console.log("Lng from TS",this.longitude)

    // this.mosqueService.getNearebyMosques(23.810332,90.41251809999994).subscribe((resData)=>{
    //   console.log("nearbyMosque",resData);
    //   this.allNearbyMosque = resData
    // })
    
  }

  ionViewWillEnter(){
    this.storage.get('mylocation').then((val)=>{
      console.log("Val->lat",val.lat);
      console.log("Val->lng",val.lng);
      
        this.mosqueService.getNearebyMosques(val.lat,val.lng).subscribe((mosques)=>{
          console.log("filtered mosque", mosques);
          if(mosques.status == 200){
            this.allNearbyMosque = mosques
          }else{
            this.mosqueService.getNearebyMosques(this.lattitude,this.longitude).subscribe((res)=>{
              this.allNearbyMosque = res
            })
          }
          
        })
    })

    
  }



}
