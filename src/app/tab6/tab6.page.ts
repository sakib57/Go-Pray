import { Component, OnInit } from '@angular/core';
import { MosjidService } from '../api/mosjid.service'
import { MosqueService } from '../services/mosque.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PrayerService } from '../services/prayer.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  prayerLat = null
  prayerLng = null
  hasLocation = false
  currentDate = new Date().toISOString().slice(0,10)
  lattitude = -33.865143
  longitude = 151.209900

  timeZone = 'Australia/Sydney'
  

  mosqueAvailable = false
  allNearbyMosque: any = [];
  upcomingWakt = 'default'

  f_hr = null
  f_mn = null
  z_hr = null
  z_mn = null
  a_hr = null
  a_mn = null
  m_hr = null
  m_mn = null
  i_hr = null
  i_mn = null
  c_hr = null
  c_mn = null

  current_time = new Date()

  fajar_time = ''
  zuhr_time = ''
  asr_time = ''
  maghrib_time = ''
  isha_time = ''

  mosque_0_prayer_time = false
  mosque_1_prayer_time = false
  mosque_2_prayer_time = false




  constructor(
    public mos: MosjidService,
    public mosqueService: MosqueService,
    public prayerService: PrayerService,
    private storage: Storage,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    const source = interval(1000);
    source.subscribe(() => {
      var aestTime = new Date().toLocaleString("en-US", {timeZone:this.timeZone});
      this.current_time = new Date(aestTime);
      this.getUpcomingWakt()
    });
    this.storage.get('mylocation').then((val)=>{
      console.log("Val->lat",val.lat);
      console.log("Val->lng",val.lng);
        
          this.mosqueService.getNearebyMosques(val.lat,val.lng).subscribe((res)=>{
            //console.log("filtered mosque", res);
            
            this.mosque_0_prayer_time = false
            this.mosque_1_prayer_time = false
            this.mosque_2_prayer_time = false
  
            if(res.status == 200){
              this.mosqueAvailable = true
              this.allNearbyMosque = res
              //=============================================
              if(res.mosques[0]){
                if(res.mosques[0]['today_prayer'] != ''){
                  this.mosque_0_prayer_time = true;
                }
              }
              console.log('eeee',this.mosque_0_prayer_time)
              
              if(res.mosques[1]){
                if(res.mosques[1]['today_prayer'] != ''){
                  this.mosque_1_prayer_time = true;
                }
              }
              
              if(res.mosques[2]){
                if(res.mosques[2]['today_prayer'] != ''){
                  this.mosque_2_prayer_time = true;
                }
              }
            }else{
              this.mosqueService.getNearebyMosques(this.lattitude,this.longitude).subscribe((res)=>{
                console.log("filtered mosque", res);
                
                this.mosque_0_prayer_time = false
                this.mosque_1_prayer_time = false
                this.mosque_2_prayer_time = false
      
                if(res.status == 200){
                  this.mosqueAvailable = true
                  this.allNearbyMosque = res
                  //=============================================
                  if(res.mosques[0]){
                    if(res.mosques[0]['today_prayer'] != ''){
                      this.mosque_0_prayer_time = true;
                    }
                  }
                  console.log('eeee',this.mosque_0_prayer_time)
                  
                  if(res.mosques[1]){
                    if(res.mosques[1]['today_prayer'] != ''){
                      this.mosque_1_prayer_time = true;
                    }
                  }
                  
                  if(res.mosques[2]){
                    if(res.mosques[2]['today_prayer'] != ''){
                      this.mosque_2_prayer_time = true;
                    }
                  }
                }else{
                  this.mosqueAvailable = false
                }
                
                //console.log(this.allNearbyMosque.mosques[0]['name'])
                //console.log(this.allNearbyMosque.mosques[1]['name'])
                
                // if(mosques.status == 200){
                //   this.mosqueAvailable = true
                //   console.log("mosque available")
                // }else{
                //   console.log("No mosque")
                // }
      
                //console.log(this.allNearbyMosque.mosques);
      
                //================================================================
                
              })
            }
            
            //console.log(this.allNearbyMosque.mosques[0]['name'])
            //console.log(this.allNearbyMosque.mosques[1]['name'])
            
            // if(mosques.status == 200){
            //   this.mosqueAvailable = true
            //   console.log("mosque available")
            // }else{
            //   console.log("No mosque")
            // }
  
            //console.log(this.allNearbyMosque.mosques);
  
            //============================================================
            
            
          })
        
        
    })

    this.storage.get('prayerLat').then((asd)=>{
      this.storage.get('prayerLng').then((res)=>{
        if(asd){
          this.prayerLat = asd
          this.prayerLng = res
          this.hasLocation = true
          this.getPrayerSchedule(asd,res,this.currentDate);
        }else{
          this.getPrayerSchedule(this.lattitude,this.longitude,this.currentDate);
        }
        if(this.hasLocation == false && this.prayerLat == null){
          this.geolocation.getCurrentPosition().then((resp) => {
            if(resp){
              //this.lattitude = resp.coords.latitude
              //this.longitude = resp.coords.longitude
    
              this.storage.set('prayerLat',resp.coords.latitude)
              this.storage.set('prayerLng',resp.coords.longitude)
    
              //console.log("With gps")
              this.getPrayerSchedule(resp.coords.latitude,resp.coords.longitude,this.currentDate);
            }
            
           }).catch((error) => {
             //console.log('With gps', error);
           });
        }
        
      })
    })
    
  }
  getPrayerSchedule(lat: any, lng: any, date: any){

    this.storage.get('prefarble').then((pref)=>{
      //console.log('prefId',pref)
      if(pref){
        this.mosqueService.mosqueDetail(pref).subscribe((mDetail)=>{

          
          this.storage.set('Fajr',mDetail.prayer_times[0]['time'])
          this.storage.set('Dhuhr',mDetail.prayer_times[1]['time'])
          this.storage.set('Asr',mDetail.prayer_times[2]['time'])
          this.storage.set('Maghrib',mDetail.prayer_times[3]['time'])
          this.storage.set('Isha',mDetail.prayer_times[4]['time'])
        })
      }else{
        this.prayerService.getPrayerTimeOfLocation(lat,lng,date).subscribe((res) => {
          this.storage.set('Fajr',res.timings[0].Fajr)
          this.storage.set('Dhuhr',res.timings[0].Dhuhr)
          this.storage.set('Asr',res.timings[0].Asr)
          this.storage.set('Maghrib',res.timings[0].Maghrib)
          this.storage.set('Isha',res.timings[0].Isha)
          this.timeZone = res.timings[0].timezone
        })
      }
    })

    
  }

  convert24to12(hr,min){
    let hr2 = null
    let min2 = null
    let f = ''
    if(hr <=12){
      if(hr < 10){
        hr2 = '0'+hr.toString()
      }else{
        hr2 = hr.toString()
      }
      f='AM'
    }else{
      if(hr - 12 < 10){
        hr2 = '0'+(hr - 12).toString()
      }else{
        hr2 = (hr - 12).toString()
      }
      f='PM'
    }
    if(min < 10){
      min2 = '0'+min.toString()
    }else{
      min2 = min.toString()
    }
    return hr2+':'+min2+' '+f
  }

  getUpcomingWakt(){
    let date = new Date()
      //let date = new Date(2019, 9, 4, 18, 15);

      // let c_hr = date.getHours()
      // let c_mn = date.getMinutes()
      let c_hr = this.current_time.getHours()
      let c_mn = this.current_time.getMinutes()
        this.storage.get('Fajr').then((val) => {
          if(val){
            
            //this.fajar_time = val
            //console.log(val)
            let q  = val.match(/\d+/g)
            this.f_hr = +q[0]
            this.f_mn = +q[1]
            this.fajar_time = this.convert24to12(+q[0],+q[1])
            if(c_hr < this.f_hr){
              this.upcomingWakt = 'fajr'
            }else if(c_hr == this.f_hr && c_mn < this.f_mn){
              this.upcomingWakt = 'fajr'
            }
          }
          console.log(this.upcomingWakt)
        })
        this.storage.get('Dhuhr').then((val) => {
          if(val){
            //this.zuhr_time = val;
            
            let q  = val.match(/\d+/g)
            this.z_hr = +q[0]
            this.z_mn = +q[1]

            this.zuhr_time = this.convert24to12(+q[0],+q[1])

            if((c_hr < this.z_hr) && (c_hr > this.f_hr)){
              this.upcomingWakt = 'zuhr'
            }else if(c_hr == this.z_hr && c_mn <= this.z_mn){
              this.upcomingWakt = 'zuhr'
            }else if(c_hr == this.f_hr && c_mn >= this.f_mn){
              this.upcomingWakt = 'zuhr'
            }
          }
          console.log(this.upcomingWakt)
        })
        this.storage.get('Asr').then((val) => {
          if(val){
            //this.asr_time = val
            
            let q  = val.match(/\d+/g)
            this.a_hr = +q[0]
            this.a_mn = +q[1]

            this.asr_time = this.convert24to12(+q[0],+q[1])

            if((c_hr < this.a_hr) && (c_hr > this.z_hr)){
              this.upcomingWakt = 'asr'
            }else if(c_hr == this.a_hr && c_mn <= this.a_mn){
              this.upcomingWakt = 'asr'
            }else if(c_hr == this.z_hr && c_mn >= this.z_mn){
              this.upcomingWakt = 'asr'
            }
          }
          console.log(this.upcomingWakt)
        })
        this.storage.get('Maghrib').then((val) => {
          if(val){
            //this.maghrib_time = val
            
            let q  = val.match(/\d+/g)
            this.m_hr = +q[0]
            this.m_mn = +q[1]
            
            this.maghrib_time = this.convert24to12(+q[0],+q[1])

            console.log(this.a_hr)
            console.log(c_hr)
            console.log(this.m_hr)
            if(c_hr < this.m_hr && c_hr > this.a_hr){
              this.upcomingWakt = 'maghrib'
            }else if(c_hr == this.a_hr && c_mn >= this.a_mn){
              this.upcomingWakt = 'maghrib'
            }else if(c_hr == this.m_hr && c_mn <= this.m_mn ){
              this.upcomingWakt = 'maghrib'
            }
          }
          console.log(this.upcomingWakt)
        })
        this.storage.get('Isha').then((val) => {
          if(val){
            //this.isha_time = val
            
            let q  = val.match(/\d+/g)
            this.i_hr = +q[0]
            this.i_mn = +q[1]
            
            this.isha_time = this.convert24to12(+q[0],+q[1])

            if(c_hr < this.i_hr && c_hr > this.m_hr){
              this.upcomingWakt = 'isha'
            }else if(c_hr == this.m_hr && c_mn >= this.m_mn){
              this.upcomingWakt = 'isha'
            }else if(c_hr == this.i_hr && c_mn <= this.i_mn){
              this.upcomingWakt = 'isha'
            }
            else if(c_hr > this.i_hr){
              this.upcomingWakt = 'fajr'
            }else if(c_hr == this.i_hr && c_mn > this.i_mn ){
              this.upcomingWakt = 'fajr'
            }
          }
          console.log(this.upcomingWakt)
        })
  }

  temp(){
    let date = new Date()
            //let date = new Date(2019, 9, 4, 18, 15);
  
            let c_hr = date.getHours()
            let c_mn = date.getMinutes()
              this.storage.get('Fajr').then((val) => {
                if(val){
                  
                  //this.fajar_time = val
                  console.log(val)
                  let q  = val.match(/\d+/g)
                  this.f_hr = +q[0]
                  this.f_mn = +q[1]
                  
                  this.fajar_time = this.convert24to12(+q[0],+q[1])

                  if(c_hr < this.f_hr){
                    this.upcomingWakt = 'fajr'
                  }else if(c_hr == this.f_hr && c_mn < this.f_mn){
                    this.upcomingWakt = 'fajr'
                  }
                }
                console.log(this.upcomingWakt)
              })
              this.storage.get('Dhuhr').then((val) => {
                if(val){
                  //this.zuhr_time = val;
                  
                  let q  = val.match(/\d+/g)
                  this.z_hr = +q[0]
                  this.z_mn = +q[1]
                  
                  this.zuhr_time = this.convert24to12(+q[0],+q[1])

                  if((c_hr < this.z_hr) && (c_hr > this.f_hr)){
                    this.upcomingWakt = 'zuhr'
                  }else if(c_hr == this.z_hr && c_mn <= this.z_mn){
                    this.upcomingWakt = 'zuhr'
                  }else if(c_hr == this.f_hr && c_mn >= this.f_mn){
                    this.upcomingWakt = 'zuhr'
                  }
                }
                console.log(this.upcomingWakt)
              })
              this.storage.get('Asr').then((val) => {
                if(val){
                  //this.asr_time = val
                  
                  let q  = val.match(/\d+/g)
                  this.a_hr = +q[0]
                  this.a_mn = +q[1]
                  
                  this.asr_time = this.convert24to12(+q[0],+q[1])

                  if((c_hr < this.a_hr) && (c_hr > this.z_hr)){
                    this.upcomingWakt = 'asr'
                  }else if(c_hr == this.a_hr && c_mn <= this.a_mn){
                    this.upcomingWakt = 'asr'
                  }else if(c_hr == this.z_hr && c_mn >= this.z_mn){
                    this.upcomingWakt = 'asr'
                  }
                }
                console.log(this.upcomingWakt)
              })
              this.storage.get('Maghrib').then((val) => {
                if(val){
                  //this.maghrib_time = val
                  
                  let q  = val.match(/\d+/g)
                  this.m_hr = +q[0]
                  this.m_mn = +q[1]
                  
                  this.maghrib_time = this.convert24to12(+q[0],+q[1])

                  console.log(this.a_hr)
                  console.log(c_hr)
                  console.log(this.m_hr)
                  if(c_hr < this.m_hr && c_hr > this.a_hr){
                    this.upcomingWakt = 'maghrib'
                  }else if(c_hr == this.a_hr && c_mn >= this.a_mn){
                    this.upcomingWakt = 'maghrib'
                  }else if(c_hr == this.m_hr && c_mn <= this.m_mn ){
                    this.upcomingWakt = 'maghrib'
                  }
                }
                console.log(this.upcomingWakt)
              })
              this.storage.get('Isha').then((val) => {
                if(val){
                  //this.isha_time = val
                  
                  let q  = val.match(/\d+/g)
                  this.i_hr = +q[0]
                  this.i_mn = +q[1]
                  
                  this.isha_time = this.convert24to12(+q[0],+q[1])

                  if(c_hr < this.i_hr && c_hr > this.m_hr){
                    this.upcomingWakt = 'isha'
                  }else if(c_hr == this.m_hr && c_mn >= this.m_mn){
                    this.upcomingWakt = 'isha'
                  }else if(c_hr == this.i_hr && c_mn <= this.i_mn){
                    this.upcomingWakt = 'isha'
                  }
                  else if(c_hr > this.i_hr){
                    this.upcomingWakt = 'fajr'
                  }else if(c_hr == this.i_hr && c_mn > this.i_mn ){
                    this.upcomingWakt = 'fajr'
                  }
                }
                console.log(this.upcomingWakt)
              })
  }

}
