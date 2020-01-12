import { Component, OnInit, NgZone  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';
import { NavController, Events } from '@ionic/angular';
import { LocationService } from '../services/location.service';
import { LocationModel } from '../models/location.model';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements OnInit {


  // GoogleAutocomplete: google.maps.places.AutocompleteService;
  // autocomplete: { input: string; };
  // autocompleteItems: any[];
  // location: any;
  // placeid: any;

  searchedLocation: LocationModel[] = [
    {
      description: '',
      place_id: '',
      latitude: null,
      longitude: null
    }
  ]

  locationShow = ''
  currentLoation: any = [];
  alllocation: any = [];
  
  lattitude = -33.865143
  longitude = 151.209900


  setlocation = { name: '', latitude: 0, longitude: 0 };
  setlocation2 = { desc: '', place_id: '',lat: '', lng: '' }; 
  isItemAvailable: boolean = false;
  searchTerm: any;
  showmenu: boolean = false;
  constructor(
    private geolocation: Geolocation, 
    public events: Events, 
    private navCtrl: NavController, 
    private nativeGeocoder: NativeGeocoder, 
    private storage: Storage,
    public locationService: LocationService,
    public zone: NgZone,
  ) { 
    // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    // this.autocomplete = { input: '' };
    // this.autocompleteItems = [];
  }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.storage.get('mylocation').then((val) => {
      if (val != null) {
        this.showmenu = true;
        this.navCtrl.navigateRoot('/tabs/tab7');
      }
    });
    this.events.subscribe('mylocation', (mylocation) => {
      if (mylocation) {
        // this.storage.get('mylocation').then((val) => {
        //   if (val != null) {
        //     this.showmenu = true;
        this.navCtrl.navigateRoot('/tabs/tab7');
        //   }
        // });
      }
    });

    this.storage.get('prayerLat').then((asd)=>{
      this.storage.get('prayerLng').then((res)=>{
        if(asd){
          this.setlocation2.lat = asd.toString();
            this.setlocation2.lng = res.toString();
      
            let options: NativeGeocoderOptions = {
              useLocale: true,
              maxResults: 1
            };
            this.locationService.getAddress(asd,res).subscribe(res=>{
              console.log(res.results[0]['formatted_address'])
              this.locationShow = res.results[0]['formatted_address']
              console.log(res)
            })
            this.nativeGeocoder.reverseGeocode(asd, res, options)
              .then((result: NativeGeocoderResult[]) => {
                this.currentLoation.countryCode = result[0].countryCode
                this.currentLoation.countryName = result[0].countryName
                this.currentLoation.subAdministrativeArea = result[0].subAdministrativeArea
                this.setlocation.name = this.currentLoation + ',' + this.currentLoation.countryCode;
      
                //console.log(result[0])
      
              })
              .catch((error: any) => console.log(error));
          
        }else{
          this.setlocation2.lat = this.lattitude.toString();
            this.setlocation2.lng = this.longitude.toString();
      
            let options: NativeGeocoderOptions = {
              useLocale: true,
              maxResults: 1
            };
            this.locationService.getAddress(this.lattitude,this.longitude).subscribe(res=>{
              console.log(res.results[0]['formatted_address'])
              this.locationShow = res.results[0]['formatted_address']
              console.log(res)
            })
            this.nativeGeocoder.reverseGeocode(this.lattitude, this.longitude, options)
              .then((result: NativeGeocoderResult[]) => {
                this.currentLoation.countryCode = result[0].countryCode
                this.currentLoation.countryName = result[0].countryName
                this.currentLoation.subAdministrativeArea = result[0].subAdministrativeArea
                this.setlocation.name = this.currentLoation + ',' + this.currentLoation.countryCode;
      
                //console.log(result[0])
      
              })
              .catch((error: any) => console.log(error));
        }

        if(!asd){

              this.geolocation.getCurrentPosition( { enableHighAccuracy: true }).then((resp) => {
                //this.setlocation.latitude = resp.coords.latitude;
                //this.setlocation.latitude = resp.coords.longitude;
          
                this.storage.set('prayerLat',resp.coords.latitude)
                this.storage.set('prayerLng',resp.coords.longitude)
          
    
    
                this.setlocation2.lat = resp.coords.latitude.toString();
                this.setlocation2.lng = resp.coords.longitude.toString();
          
                let options: NativeGeocoderOptions = {
                  useLocale: true,
                  maxResults: 1
                };
                this.locationService.getAddress(resp.coords.latitude,resp.coords.longitude).subscribe(res=>{
                  console.log(res.results[0]['formatted_address'])
                  this.locationShow = res.results[0]['formatted_address']
                  console.log(res)
                })
                this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
                  .then((result: NativeGeocoderResult[]) => {
                    this.currentLoation.countryCode = result[0].countryCode
                    this.currentLoation.countryName = result[0].countryName
                    this.currentLoation.subAdministrativeArea = result[0].subAdministrativeArea
                    this.setlocation.name = this.currentLoation + ',' + this.currentLoation.countryCode;
          
                    //console.log(result[0])
          
                  })
                  .catch((error: any) => console.log(error));
              }).catch((error) => {
                console.log('Error getting location', error);
              });
        }
                
      })
    })



















    
  }

  // onCancel(sdfs) {
  //   // this.setItems()
  // }
  locationClick(item) {
    if(item){
      this.setlocation2.desc = item.description;
      this.setlocation2.place_id = item.place_id;
      this.setlocation2.lat = item.latitude;
      this.setlocation2.lng = item.longitude;

      
    }
    this.searchTerm = item.description;
    this.alllocation = [];
  }

  filterItems(ev: any) {
    let val = ev.target.value;
   // var len = val.length
    this.isItemAvailable = true;
    //var myItem = [];
    // for (var i = 0; i < this.mylocation.length; i++) {
    //   if (this.mylocation[i]['name'].toLowerCase().slice(0, len) == val.toLowerCase()) {
    //     myItem.push(this.mylocation[i]);
    //   }
    // }
    // this.alllocation = myItem;
    this.locationService.getLocation(val).subscribe((res)=>{
      console.log(res);
      this.alllocation = res
    })
  }

  setLocation() {
    this.storage.set('mylocation', this.setlocation2).then(res => {
      this.showmenu = true;
      this.storage.set('prayerLat',res.lat)
      this.storage.set('prayerLng',res.lng)
      this.events.publish('mylocation', 'prefarble');
      this.navCtrl.navigateRoot('/tabs/tab7');
    })
  }

  //===============================================================
  // updateSearchResults(){
  //   if (this.autocomplete.input == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }
  //   this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  //   (predictions, status) => {
  //     this.autocompleteItems = [];
  //     this.zone.run(() => {
  //       predictions.forEach((prediction) => {
  //         this.autocompleteItems.push(prediction);
  //       });
  //     });
  //   });
  // }
  // selectSearchResult(item) {
  //   console.log(item)
  //   this.location = item
  //   this.placeid = this.location.place_id
  //   console.log('placeid'+ this.placeid)
  // }
  // GoTo(){
  //   return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeid;
  // }

}
