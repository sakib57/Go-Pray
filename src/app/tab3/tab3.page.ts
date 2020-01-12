import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PrayerService } from '../services/prayer.service';
import { Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  showPrefareble: boolean = false;
  all_silent = false
  
  
  currentDate = new Date().toISOString().slice(0,10)
  current_time = new Date()
  lattitude = -33.865143
  longitude = 151.209900

  prayerLat = null
  prayerLng = null
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

  fajar_time = ''
  imsak_time = ''
  sunrise_time = ''
  zuhr_time = ''
  asr_time = ''
  maghrib_time = ''
  isha_time = ''

  fajr_left = ''
  zuhr_left = ''
  asr_left = ''
  maghrib_left = ''
  isha_left = ''

  

  imsakAlermStatus = 1
  fajrAlermStatus = 1
  sunriseAlermStatus = 1
  zuhrAlermStatus = 1
  asrAlermStatus = 1
  maghribAlermStatus = 1
  sunsetAlermStatus = 1
  ishaAlermStatus = 1
  alermStatus = 1

 
    
  MosqueImage = ''
  MosqueName = ''

  Fajr = ''
  Sunrise = ''
  Dhuhr = ''
  Asr = ''
  Sunset = ''
  Maghrib = ''
  Isha = ''
  Imsak = ''
  Midnight = ''

  timeZone = 'Australia/Sydney'
  constructor(
    public storage: Storage, 
    private streamingMedia: StreamingMedia, 
    public events: Events,
    public prayerService: PrayerService,
    private geolocation: Geolocation,
    public router: Router,
    public mosqueService: MosqueService,
  ) {
    this.events.subscribe('prefarble', (prefarble) => {
      if (prefarble) {
        this.showPrefareble = true;
      }
    });
  }

  ngOnInit(){
    const source = interval(1000);
    source.subscribe(() => {
      var aestTime = new Date().toLocaleString("en-US", {timeZone:this.timeZone});
      this.current_time = new Date(aestTime);
      this.getUpcomingWakt()
    });
  }

  ionViewWillEnter(){
    this.storage.get('user_id').then((userID)=>{
      console.log("uuu_id",userID);
      if(userID){
        this.mosqueService.getPref(userID).subscribe(res=>{
          console.log('hhhhh',res)
          if(res.mosque_id != null){
            this.showPrefareble = true;
            console.log(this.showPrefareble)
          }else{
            this.showPrefareble = false;
          }
          
        })
      }else{
        this.showPrefareble = false
      }
      
    })
    //============================================
    
    this.storage.get('prayerLat').then((asd)=>{
      this.storage.get('prayerLng').then((res)=>{
        if(asd){
          this.prayerLat = asd
          this.prayerLng = res
          this.getPrayerSchedule(asd,res,this.currentDate);
        }else{
          this.getPrayerSchedule(this.lattitude,this.longitude,this.currentDate);
        }
        console.log('prayer lat',this.prayerLat);
        
        if(!asd){
          this.geolocation.getCurrentPosition().then((resp) => {
            if(resp){
              this.storage.set('prayerLat',resp.coords.latitude)
              this.storage.set('prayerLng',resp.coords.longitude)
              this.prayerLat = resp.coords.latitude
              this.prayerLng = resp.coords.longitude
              this.getPrayerSchedule(resp.coords.latitude,resp.coords.longitude,this.currentDate);
            }
           }) 
        }
        
         
         
      })
    })

    //=====================================================================
    this.events.subscribe('imsakAlarm',(alrmst)=>{
      if(alrmst){
        this.imsakAlermStatus = alrmst
      }
    })
    this.storage.get('imsakAlarm').then((val) => {
      if(val){
        this.imsakAlermStatus = val
      }
    })
    this.events.subscribe('fajrAlarm',(alrmst)=>{
      if(alrmst){
        this.fajrAlermStatus = alrmst
      }
    })
    this.storage.get('fajrAlarm').then((val) => {
      if(val){
        this.fajrAlermStatus = val
      }
    })
    this.events.subscribe('sunriseAlarm',(alrmst)=>{
      if(alrmst){
        this.sunriseAlermStatus = alrmst
      }
    })
    this.storage.get('sunriseAlarm').then((val) => {
      if(val){
        this.sunriseAlermStatus = val
      }
    })
    this.events.subscribe('zuhrAlarm',(alrmst)=>{
      if(alrmst){
        this.zuhrAlermStatus = alrmst
      }
    })
    this.storage.get('zuhrAlarm').then((val) => {
      if(val){
        this.zuhrAlermStatus = val
      }
    })
    this.events.subscribe('asrAlarm',(alrmst)=>{
      if(alrmst){
        this.asrAlermStatus = alrmst
      }
    })
    this.storage.get('asrAlarm').then((val) => {
      if(val){
        this.asrAlermStatus = val
      }
    })
    this.events.subscribe('maghribAlarm',(alrmst)=>{
      if(alrmst){
        this.maghribAlermStatus = alrmst
      }
    })
    this.storage.get('maghribAlarm').then((val) => {
      if(val){
        this.maghribAlermStatus = val
      }
    })
    this.events.subscribe('sunsetAlarm',(alrmst)=>{
      if(alrmst){
        this.sunsetAlermStatus = alrmst
      }
    })
    this.storage.get('sunsetAlarm').then((val) => {
      if(val){
        this.sunsetAlermStatus = val
      }
    })
    this.events.subscribe('ishaAlarm',(alrmst)=>{
      if(alrmst){
        this.ishaAlermStatus = alrmst
      }
    })
    this.storage.get('ishaAlarm').then((val) => {
      if(val){
        this.ishaAlermStatus = val
      }
    })

    this.storage.get('all_silent').then((val) => {
      console.log('mmmmm',val)
      if(val == '0'){
        this.all_silent = false
      }else if(val == '1'){
        this.all_silent = true
      }
    })

  }

  getPrayerSchedule(lat: any, lng: any, date: any){

    this.events.subscribe('user_id',(userId)=>{
      if(userId){
        this.getSchedule(lat,lng,date,userId)
      }
    })

    this.storage.get('user_id').then((userID)=>{
      console.log("opopopo_id",userID);
      
        this.getSchedule(lat,lng,date,userID)
      
    })
  }

  getSchedule(lat,lng,date,userId){
    this.mosqueService.getPref(userId).subscribe(pref=>{
      console.log("uuu_id",pref);
      console.log('ppppp',this.showPrefareble)
      if(this.showPrefareble){
        if(pref.status == 200){
          this.mosqueService.msqDetail(pref.mosque_id).subscribe((mDetail)=>{
  
            console.log('mDetail',mDetail);
            //console.log('mosqueName',mDetail.mosque_details.name);
            //console.log('FFajar',mDetail.prayer_times[0]['time']);
            if(mDetail.mosque_details.name){
              this.MosqueName = mDetail.mosque_details.name
            }
            if(mDetail.mosque_details.main_image){
              this.MosqueImage = mDetail.mosque_details.main_image
            }
            
            if(mDetail.prayer_times[0]['time'] != ''){
              this.Fajr = mDetail.prayer_times[0]['time']
              this.storage.set('Fajr',mDetail.prayer_times[0]['time'])
            }
            if(mDetail.prayer_times[1]['time'] != ''){
              this.Dhuhr = mDetail.prayer_times[1]['time']
              this.storage.set('Dhuhr',mDetail.prayer_times[1]['time'])
            }
            if(mDetail.prayer_times[2]['time'] != ''){
              this.Asr = mDetail.prayer_times[2]['time']
              this.storage.set('Asr',mDetail.prayer_times[2]['time'])
            }
            if(mDetail.prayer_times[3]['time'] != ''){
              this.Maghrib = mDetail.prayer_times[3]['time']
              this.storage.set('Maghrib',mDetail.prayer_times[3]['time'])
            }
            if(mDetail.prayer_times[4]['time'] != ''){
              this.Isha = mDetail.prayer_times[4]['time']
              this.storage.set('Isha',mDetail.prayer_times[4]['time'])
            }
            //this.getUpcomingWakt()
          })
        }else{
          this.getSchedulebyLocation(lat,lng,date)
        }
      }else{
        this.getSchedulebyLocation(lat,lng,date)
      }
    })
  }

  getSchedulebyLocation(lat,lng,date){
    this.prayerService.getPrayerTimeOfLocation(lat,lng,date).subscribe((res) => {
      
      this.Imsak = res.timings[0].Imsak
      this.Fajr = res.timings[0].Fajr
      this.storage.set('Fajr',res.timings[0].Fajr)

      this.Sunrise = res.timings[0].Sunrise
      this.Dhuhr = res.timings[0].Dhuhr
      this.storage.set('Dhuhr',res.timings[0].Dhuhr)

      this.Asr = res.timings[0].Asr
      this.storage.set('Asr',res.timings[0].Asr)

      this.Sunset = res.timings[0].Sunset
      this.Maghrib = res.timings[0].Maghrib
      this.storage.set('Maghrib',res.timings[0].Maghrib)

      this.Isha = res.timings[0].Isha
      this.storage.set('Isha',res.timings[0].Isha)
      this.Midnight = res.timings[0].Midnight
      this.timeZone = res.timings[0].timezone

      //this.getUpcomingWakt()
    })
  }

  setAlerm(wakt: string){
    this.storage.set('wakt',wakt)
    this.router.navigateByUrl('adhannotification')
  }

  openLiveVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };

    this.streamingMedia.playVideo('https://www.youtube.com/watch?v=nJ4jFh4cYLE', options);
  }




  countDown(hr,mn){
    //console.log(this.hr)
    var date = new Date()
    var n_date = date.toISOString().substring(0, 11);
    
    
    if(hr < 10 && mn < 10){
      var nn_date = n_date+'0'+hr+':'+'0'+mn
    }
    else if(mn < 10){
      var nn_date = n_date+hr+':'+'0'+mn
    }else if(hr < 10){
      var nn_date = n_date+'0'+hr+':'+mn
    }else{
      var nn_date = n_date+hr+':'+mn
    }
    var end = (Date.parse(nn_date) / 1000)
    var now = (Date.parse(this.current_time.toString()) / 1000);
    var timeLeft = end - now
    var hour = Math.floor(timeLeft / 3600)
    var minute = Math.floor((timeLeft - (hour*3600)) / 60)
    var seconds = Math.floor((timeLeft - (hour * 3600) - (minute * 60)));
    
    if(hour < 10){
      if(this.upcomingWakt == 'Fajr'){
        var new_hr = 24 + hour
        var final_hr = '0'+new_hr.toString()
      }else{
        var final_hr = '0'+hour.toString()
      }
    }else{
      var final_hr = hour.toString()
    }

    if(minute < 10){
      var final_mn = '0'+minute.toString()
    }else{
      var final_mn = minute.toString()
    }

    if(seconds < 10){
      var final_sc = '0'+seconds.toString()
    }else{
      var final_sc = seconds.toString()
    }

    return final_hr+':'+final_mn+':'+final_sc
    //============================================
  }


  getUpcomingWakt(){
    //let date = new Date()
      //let date = new Date(2019, 9, 4, 18, 15);

      let c_hr = this.current_time.getHours()
      let c_mn = this.current_time.getMinutes()

      // let c_hr = date.getHours()
      // let c_mn = date.getMinutes()
      this.storage.get('Fajr').then((val) => {
          
      if(val){
        //this.fajar_time = val
        //console.log(val)
        let q  = val.match(/\d+/g)
        this.f_hr = +q[0]
        this.f_mn = +q[1]
        
        this.fajar_time = this.convert24to12(+q[0],+q[1])

        if(c_hr < this.f_hr){
          this.upcomingWakt = 'Fajr'
        }else if(c_hr == this.f_hr && c_mn < this.f_mn){
          this.upcomingWakt = 'Fajr'
        }
        this.fajr_left = this.countDown(this.f_hr,this.f_mn)
        // const source = interval(1000);
        // source.subscribe(() => {
        //   this.fajr_left = this.countDown(this.f_hr,this.f_mn)
        // });

      }
      //console.log(this.upcomingWakt)
    })
    this.storage.get('Dhuhr').then((val) => {
      if(val){
        //this.zuhr_time = val;
        
        let q  = val.match(/\d+/g)
        this.z_hr = +q[0]
        this.z_mn = +q[1]
        
        this.zuhr_time = this.convert24to12(+q[0],+q[1])

        if((c_hr < this.z_hr) && (c_hr > this.f_hr)){
          this.upcomingWakt = 'Zuhr'
        }else if(c_hr == this.z_hr && c_mn <= this.z_mn){
          this.upcomingWakt = 'Zuhr'
        }else if(c_hr == this.f_hr && c_mn >= this.f_mn){
          this.upcomingWakt = 'Zuhr'
        }

        this.zuhr_left = this.countDown(this.z_hr,this.z_mn)
        // const source = interval(1000);
        // source.subscribe(() => {
        //   this.zuhr_left = this.countDown(this.z_hr,this.z_mn)
        // });
      }
      //console.log(this.upcomingWakt)
    })
    this.storage.get('Asr').then((val) => {
      if(val){
        //this.asr_time = val
        
        let q  = val.match(/\d+/g)
        this.a_hr = +q[0]
        this.a_mn = +q[1]
        
        this.asr_time = this.convert24to12(+q[0],+q[1])

        if((c_hr < this.a_hr) && (c_hr > this.z_hr)){
          this.upcomingWakt = 'Asr'
        }else if(c_hr == this.a_hr && c_mn <= this.a_mn){
          this.upcomingWakt = 'Asr'
        }else if(c_hr == this.z_hr && c_mn >= this.z_mn){
          this.upcomingWakt = 'Asr'
        }

        this.asr_left = this.countDown(this.a_hr,this.a_mn)
        // const source = interval(1000);
        // source.subscribe(() => {
        //   this.asr_left = this.countDown(this.a_hr,this.a_mn)
        // });
      }
      //console.log(this.upcomingWakt)
    })
    this.storage.get('Maghrib').then((val) => {
      if(val){
        //this.maghrib_time = val
        
        let q  = val.match(/\d+/g)
        this.m_hr = +q[0]
        this.m_mn = +q[1]
        
        this.maghrib_time = this.convert24to12(+q[0],+q[1])

        //console.log(this.a_hr)
        //console.log(c_hr)
        //console.log(this.m_hr)
        if(c_hr < this.m_hr && c_hr > this.a_hr){
          this.upcomingWakt = 'Maghrib'
        }else if(c_hr == this.a_hr && c_mn >= this.a_mn){
          this.upcomingWakt = 'Maghrib'
        }else if(c_hr == this.m_hr && c_mn <= this.m_mn ){
          this.upcomingWakt = 'Maghrib'
        }
        this.maghrib_left = this.countDown(this.m_hr,this.m_mn)
        // const source = interval(1000);
        // source.subscribe(() => {
        //   this.maghrib_left = this.countDown(this.m_hr,this.m_mn)
        // });
      }
      //console.log(this.upcomingWakt)
    })
    this.storage.get('Isha').then((val) => {
      if(val){
        //this.isha_time = val
        
        let q  = val.match(/\d+/g)
        this.i_hr = +q[0]
        this.i_mn = +q[1]
        
        this.isha_time = this.convert24to12(+q[0],+q[1])

        if(c_hr < this.i_hr && c_hr > this.m_hr){
          this.upcomingWakt = 'Isha'
        }else if(c_hr == this.m_hr && c_mn >= this.m_mn){
          this.upcomingWakt = 'Isha'
        }else if(c_hr == this.i_hr && c_mn <= this.i_mn){
          this.upcomingWakt = 'Isha'
        }
        else if(c_hr > this.i_hr){
          this.upcomingWakt = 'Fajr'
        }else if(c_hr == this.i_hr && c_mn > this.i_mn ){
          this.upcomingWakt = 'Fajr'
        }
        this.isha_left = this.countDown(this.i_hr,this.i_mn)
        // const source = interval(1000);
        // source.subscribe(() => {
        //   this.isha_left = this.countDown(this.i_hr,this.i_mn)
        // });
      }

      //extra
      let imsak  = this.Imsak.match(/\d+/g)
      if(imsak){
        this.imsak_time = this.convert24to12(+imsak[0],+imsak[1])
      }
      //extra
      let sunrise  = this.Imsak.match(/\d+/g)
      if(sunrise){
        this.sunrise_time = this.convert24to12(+sunrise[0],+sunrise[1])
      }
    })
  }

  makeAllSilent(){
    this.all_silent = !this.all_silent
    if(this.all_silent){
      this.storage.set('all_silent','1')
    }else if(!this.all_silent){
      this.storage.set('all_silent','0')
    }
    
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
  

}
