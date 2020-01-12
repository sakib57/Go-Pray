//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {  Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import {  GoogleMaps } from '@ionic-native/google-maps';

import {
  ToastController,
  LoadingController
} from '@ionic/angular';

import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { Storage } from '@ionic/storage';
import { interval } from 'rxjs';
import { MosqueService } from '../services/mosque.service';
import { PrayerService } from '../services/prayer.service';

@Component({
  selector: 'app-searched-news',
  templateUrl: './searched-news.page.html',
  styleUrls: ['./searched-news.page.scss'],
})
export class SearchedNewsPage implements OnInit {
  search_value = ''
  dataAvailable = false
  //news = []
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  i = 0
  length = 8
  //queryText = ''
  data_finish = false
  loading_data = false
  news = [
     {
        id: null,
        source_name: "",
        author: "",
        title: "",
        description: "",
        image_url: "",
        published_at: "",
        content: "",
        like_count: "",
        share_count: "",
        news_like: "",
        news_bookmark: "",
    }
  ]
  show_news = [
     {
        id: null,
        source_name: "",
        author: "",
        title: "",
        description: "",
        image_url: "",
        published_at: "",
        content: "",
        like_count: "",
        share_count: "",
        news_like: "",
        news_bookmark: "",
    }
  ]





  upcomingWakt = 'default'

  fajr_left = ''
  zuhr_left = ''
  asr_left = ''
  maghrib_left = ''
  isha_left = ''

  timeZone = ''

  currentDate = new Date().toISOString().slice(0,10)

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


  lattitude = -33.865143
  longitude = 151.209900


  showPrefareble = false

  prayerLat = null
  prayerLng = null

  Fajr = ''
  Sunrise = ''
  Dhuhr = ''
  Asr = ''
  Sunset = ''
  Maghrib = ''
  Isha = ''
  Imsak = ''
  Midnight = ''

  fajar_time = ''
  zuhr_time = ''
  asr_time = ''
  maghrib_time = ''
  isha_time = ''
  // @ViewChild('map') element;
  // map: GoogleMap;
  // loading: any;
  constructor(
    public googleMaps: GoogleMaps, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform, 
    public nav: NavController,
    private push: Push,
    public router: Router,
    public localNotifications: LocalNotifications,
    public newsService: NewsService,
    public storage: Storage,
    public mosqueService: MosqueService,
    public events: Events,
    private geolocation: Geolocation,
    public prayerService: PrayerService,
    private socialSharing: SocialSharing,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.route.queryParams.subscribe((res)=>{
      this.search_value = res.value
    })
    console.log(this.search_value)

    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
    }).then(() => console.log('Channel created'));
    this.push.listChannels().then((channels) => console.log('List of channels', channels))
    const options: PushOptions = {
        android: {
          sound: "true",
					icon: "uu",
        },
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
    }
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)
       console.log(notification.title)
       console.log(notification.message)
       console.log(notification.additionalData.notId)
      if(notification.additionalData.foreground == true){
        this.localNotifications.schedule({
          title: notification.title,
          text: notification.message
        });
        this.localNotifications.on('click').subscribe(() => {
          
          this.router.navigate(['notification-detail',notification.additionalData.notId])
        });
      }else{
        this.router.navigate(['notification-detail',notification.additionalData.notId])
      }
      
    });

    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.searchNews(this.search_value,0).subscribe(res=>{
          this.news = res.news
          for(let i = 0; i < res.news.length; i++){
            this.newsService.checkNewsStatus(userID,res.news[i].id).subscribe(res2=>{
              if(res2.news_status.like_news == '1'){
                this.news[i]['news_like'] = '1'
              }
              if(res2.news_status.bookmark_news == '1'){
                this.news[i]['news_bookmark'] = '1'
              }
            })
          }
          this.dataAvailable = true
        })
      }else{
        this.newsService.searchNews(this.search_value,0).subscribe(res=>{
          this.news = res.news
          console.log('without_id',this.news)
          this.dataAvailable = true
        })
        
      }
    })
    

    
    //============================================
    
    this.storage.get('prayerLat').then((asd)=>{
      this.storage.get('prayerLng').then((res)=>{
        if(asd){
          this.prayerLat = asd
          this.prayerLng = res
          this.getPrayerSchedule(asd,res,this.currentDate);
          this.getUpcomingWakt()
        }else{
          this.getPrayerSchedule(this.lattitude,this.longitude,this.currentDate);
          this.getUpcomingWakt()
        }
        console.log('prayer lat',this.prayerLat);
        console.log('asd',asd);
        if(!asd){
          this.geolocation.getCurrentPosition().then((resp) => {
            if(resp){
              this.storage.set('prayerLat',resp.coords.latitude)
              this.storage.set('prayerLng',resp.coords.longitude)
              this.prayerLat = resp.coords.latitude
              this.prayerLng = resp.coords.longitude
              this.getPrayerSchedule(resp.coords.latitude,resp.coords.longitude,this.currentDate);
              this.getUpcomingWakt()
            }
           })
        }
                
      })
    })
  }

  like(post_id){
    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.like(userID,post_id).subscribe(res=>{
          console.log(res)
        })
        for(let i = 0; i < this.news.length ; i++){
          if(this.news[i].id == post_id){
            this.news[i].like_count = (+this.news[i].like_count + 1).toString()
            this.news[i].news_like = '1'
          }
        }
      }else{
        this.router.navigateByUrl('login')
      }
    })
    
  }
  unlike(post_id){
    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.like(userID,post_id).subscribe(res=>{
          console.log(res)
        })
        for(let i = 0; i < this.news.length ; i++){
          if(this.news[i].id == post_id){
            this.news[i].like_count = (+this.news[i].like_count - 1).toString()
            this.news[i].news_like = '0'
          }
        }
      }else{
        this.router.navigateByUrl('login')
      }
    })
  }

  save_bookmark(post_id){
    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.bookmark(userID,post_id).subscribe(res=>{
          console.log(res)
        })
        for(let i = 0; i < this.news.length ; i++){
          if(this.news[i].id == post_id){
            this.news[i].news_bookmark = '1'
          }
        }
        this.presentToast('News added to your bookmark')
        
      }else{
        this.router.navigateByUrl('login')
      }
    })
  }


  discard_bookmark(post_id){
    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.bookmark(userID,post_id).subscribe(res=>{
          console.log(res)
        })
        for(let i = 0; i < this.news.length ; i++){
          if(this.news[i].id == post_id){
            this.news[i].news_bookmark = '0'
          }
        }
        this.presentToast('News removed from your bookmark')
        
      }else{
        this.router.navigateByUrl('login')
      }
    })
  }

  share(post_id){
    console.log(post_id)
    this.newsService.getNews(post_id).subscribe(res=>{
      const url = res.news.news_url
      this.socialSharing.shareViaFacebook('', null /* img */, url /* url , function() {console.log('share ok')}, function(errormsg){alert(errormsg)}*/).then(() => {
        // Success!
        console.log('Success')
        this.newsService.updateShareCount(post_id).subscribe(()=>{
          console.log('Share Count Updated')
        })
      }).catch(() => {
        // Error!
        console.log('Error')
      });
    })
    
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
      //console.log('ppppp',this.showPrefareble)
      if(this.showPrefareble){
        if(pref.status == 200){
          this.mosqueService.msqDetail(pref.mosque_id).subscribe((mDetail)=>{
  
            console.log('mDetail',mDetail);
            //console.log('mosqueName',mDetail.mosque_details.name);
            //console.log('FFajar',mDetail.prayer_times[0]['time']);
            
            
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
            this.getUpcomingWakt()
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

      this.getUpcomingWakt()
    })
  }

  // loadMap() {
  //   this.map = GoogleMaps.create('map_canvas', {
  //     camera: {
  //       target: {
  //         lat: 43.0741704,
  //         lng: -89.3809802
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   });

  // }

  // async onButtonClick() {
  //   this.map.clear();

  //   this.loading = await this.loadingCtrl.create({
  //     message: 'Please wait...'
  //   });
  //   await this.loading.present();

  //   // Get the location of you
  //   this.map.getMyLocation().then((location) => {
  //     this.loading.dismiss();
  //     console.log(JSON.stringify(location, null, 2));

  //     // Move the map camera to the location with animation
  //     this.map.animateCamera({
  //       target: location.latLng,
  //       zoom: 17,
  //       tilt: 30
  //     });

  //     // add a marker
  //     let marker: Marker = this.map.addMarkerSync({
  //       title: '@ionic-native/google-maps plugin!',
  //       snippet: 'This plugin is awesome!',
  //       position: location.latLng,
  //       animation: GoogleMapsAnimation.BOUNCE
  //     });
  //     marker.on(GoogleMapsEvent.MARKER_DRAG_END)
  //       .subscribe(() => {

  //         marker.getPosition()
  //       });

  //     // show the infoWindow
  //     marker.showInfoWindow();

  //     // If clicked it, display the alert
  //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //       this.showToast('clicked!');
  //     });
  //   })
  //     .catch(err => {
  //       this.loading.dismiss();
  //       this.showToast(err.error_message);
  //     });
  // }

  // async showToast(message: string) {
  //   let toast = await this.toastCtrl.create({
  //     message: message,
  //     duration: 2000,
  //     position: 'middle'
  //   });

  //   toast.present();
  // }

  // commetChat(){
  //   var appId = "83818cb74c5968";
  //   CometChat.init(appId).then(
  //     () => {
  //       console.log("Initialization completed successfully");
  //       this.auth()
  //     },
  //     error => {
  //       console.log("Initialization failed with error:", error);
  //       //Check the reason for error and take apppropriate action.
  //     }
  //   );
  // }

  // auth(){
  //   var UID = "SUPERHERO2";
  //   var apiKey = "e006a63c57445c7c3b0e3219240560b1614494a4";

  //   CometChat.login(UID, apiKey).then(
  //     User => {
  //       console.log("Login Successful:", { User });
  //       this.receiveCall()
  //     },
  //     error => {
  //       console.log("Login failed with exception:", { error });
  //       // User login failed, check error and take appropriate action.
  //     }
  //   );
  // }


  // receiveCall(){
  //   console.log("in receive call")
  //   var listnerID = "121212ss44";
  //   var x = <CometChat.CallEventListener>new CometChat.CallListener('test',  
  //   {
  //     onIncomingCallReceived(call) {
  //       console.log("Incoming call:", call);
  //       // Handle incoming call
  //     },
  //     onOutgoingCallAccepted(call) {
  //       console.log("Outgoing call accepted:", call);
  //       // Outgoing Call Accepted
  //      },
  //      onOutgoingCallRejected(call) {
  //       console.log("Outgoing call rejected:", call);
  //       // Outgoing Call Rejected
  //      },
  //      onIncomingCallCancelled(call) {
  //       console.log("Incoming call calcelled:", call);
  //      }
  //   })
  //   CometChat.addCallListener(listnerID,x);
  // }

  getUpcomingWakt(){
    let date = new Date()
      //let date = new Date(2019, 9, 4, 18, 15);
      let c_hr = date.getHours()
      let c_mn = date.getMinutes()

      if(this.Fajr){
        this.fajar_time = this.Fajr
        //console.log(val)
        let q  = this.Fajr.match(/\d+/g)
        this.f_hr = +q[0]
        this.f_mn = +q[1]
        
        if(c_hr < this.f_hr){
          this.upcomingWakt = 'Fajr'
        }else if(c_hr == this.f_hr && c_mn < this.f_mn){
          this.upcomingWakt = 'Fajr'
        }
        this.fajr_left = this.countDown(this.f_hr,this.f_mn)
        const source = interval(1000);
        source.subscribe(() => {
          this.fajr_left = this.countDown(this.f_hr,this.f_mn)
        });
      }else{
        this.storage.get('Fajr').then((val) => {
          console.log('vvvvvvvvvvv',val);
          if(val){
            this.fajar_time = val
            //console.log(val)
            let q  = val.match(/\d+/g)
            this.f_hr = +q[0]
            this.f_mn = +q[1]
            
            if(c_hr < this.f_hr){
              this.upcomingWakt = 'Fajr'
            }else if(c_hr == this.f_hr && c_mn < this.f_mn){
              this.upcomingWakt = 'Fajr'
            }
            this.fajr_left = this.countDown(this.f_hr,this.f_mn)
            const source = interval(1000);
            source.subscribe(() => {
              this.fajr_left = this.countDown(this.f_hr,this.f_mn)
            });

          }
          //console.log(this.upcomingWakt)
        })
      }
      if(this.Dhuhr){
        this.zuhr_time = this.Dhuhr;
        
        let q  = this.Dhuhr.match(/\d+/g)
        this.z_hr = +q[0]
        this.z_mn = +q[1]
        
        if((c_hr < this.z_hr) && (c_hr > this.f_hr)){
          this.upcomingWakt = 'Zuhr'
        }else if(c_hr == this.z_hr && c_mn <= this.z_mn){
          this.upcomingWakt = 'Zuhr'
        }else if(c_hr == this.f_hr && c_mn >= this.f_mn){
          this.upcomingWakt = 'Zuhr'
        }

        this.zuhr_left = this.countDown(this.z_hr,this.z_mn)
        const source = interval(1000);
        source.subscribe(() => {
          this.zuhr_left = this.countDown(this.z_hr,this.z_mn)
        });
      }else{
        this.storage.get('Dhuhr').then((val) => {
          if(val){
            this.zuhr_time = val;
            
            let q  = val.match(/\d+/g)
            this.z_hr = +q[0]
            this.z_mn = +q[1]
            
            if((c_hr < this.z_hr) && (c_hr > this.f_hr)){
              this.upcomingWakt = 'Zuhr'
            }else if(c_hr == this.z_hr && c_mn <= this.z_mn){
              this.upcomingWakt = 'Zuhr'
            }else if(c_hr == this.f_hr && c_mn >= this.f_mn){
              this.upcomingWakt = 'Zuhr'
            }
    
            this.zuhr_left = this.countDown(this.z_hr,this.z_mn)
            const source = interval(1000);
            source.subscribe(() => {
              this.zuhr_left = this.countDown(this.z_hr,this.z_mn)
            });
          }
          //console.log(this.upcomingWakt)
        })
      }
      if(this.Asr){
        this.asr_time = this.Asr
        
        let q  = this.Asr.match(/\d+/g)
        this.a_hr = +q[0]
        this.a_mn = +q[1]
        
        if((c_hr < this.a_hr) && (c_hr > this.z_hr)){
          this.upcomingWakt = 'Asr'
        }else if(c_hr == this.a_hr && c_mn <= this.a_mn){
          this.upcomingWakt = 'Asr'
        }else if(c_hr == this.z_hr && c_mn >= this.z_mn){
          this.upcomingWakt = 'Asr'
        }

        this.asr_left = this.countDown(this.a_hr,this.a_mn)
        const source = interval(1000);
        source.subscribe(() => {
          this.asr_left = this.countDown(this.a_hr,this.a_mn)
        });
      }else{
        this.storage.get('Asr').then((val) => {
          if(val){
            this.asr_time = val
            
            let q  = val.match(/\d+/g)
            this.a_hr = +q[0]
            this.a_mn = +q[1]
            
            if((c_hr < this.a_hr) && (c_hr > this.z_hr)){
              this.upcomingWakt = 'Asr'
            }else if(c_hr == this.a_hr && c_mn <= this.a_mn){
              this.upcomingWakt = 'Asr'
            }else if(c_hr == this.z_hr && c_mn >= this.z_mn){
              this.upcomingWakt = 'Asr'
            }
    
            this.asr_left = this.countDown(this.a_hr,this.a_mn)
            const source = interval(1000);
            source.subscribe(() => {
              this.asr_left = this.countDown(this.a_hr,this.a_mn)
            });
          }
          //console.log(this.upcomingWakt)
        })
      }
      if(this.Maghrib){
        this.maghrib_time = this.Maghrib
        
        let q  = this.Maghrib.match(/\d+/g)
        this.m_hr = +q[0]
        this.m_mn = +q[1]
        
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
        const source = interval(1000);
        source.subscribe(() => {
          this.maghrib_left = this.countDown(this.m_hr,this.m_mn)
        });
      }else{
        this.storage.get('Maghrib').then((val) => {
          if(val){
            this.maghrib_time = val
            
            let q  = val.match(/\d+/g)
            this.m_hr = +q[0]
            this.m_mn = +q[1]
            
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
            const source = interval(1000);
            source.subscribe(() => {
              this.maghrib_left = this.countDown(this.m_hr,this.m_mn)
            });
          }
          //console.log(this.upcomingWakt)
        })
      }
      if(this.Isha){
        this.isha_time = this.Isha
        
        let q  = this.Isha.match(/\d+/g)
        this.i_hr = +q[0]
        this.i_mn = +q[1]
        
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
        const source = interval(1000);
        source.subscribe(() => {
          this.isha_left = this.countDown(this.i_hr,this.i_mn)
        });
      }
      else{
        this.storage.get('Isha').then((val) => {
          if(val){
            this.isha_time = val
            
            let q  = val.match(/\d+/g)
            this.i_hr = +q[0]
            this.i_mn = +q[1]
            
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
            const source = interval(1000);
            source.subscribe(() => {
              this.isha_left = this.countDown(this.i_hr,this.i_mn)
            });
          }
        })
      }
    
  }

  countDown(hr,mn){
    //console.log(this.hr)
    var date = new Date()
    var n_date = date.toISOString().substring(0, 11);
    if(hr < 10){
      var nn_date = n_date+'0'+hr+':'+mn
    }
    else if(mn < 10){
      var nn_date = n_date+hr+':'+'0'+mn
    }else if(hr < 10 && mn < 10){
      var nn_date = n_date+'0'+hr+':'+'0'+mn
    }else{
      var nn_date = n_date+hr+':'+mn
    }
    var end = (Date.parse(nn_date) / 1000)
    var now = (Date.parse(new Date().toString()) / 1000);
    var timeLeft = end - now
    var hour = Math.floor(timeLeft / 3600)
    var minute = Math.floor((timeLeft - (hour*3600)) / 60)
    var seconds = Math.floor((timeLeft - (hour * 3600) - (minute * 60)));
    
    if(hour < 10){
      var final_hr = '0'+hour.toString()
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if(this.length < this.news.length){
        this.newsService.searchNews(this.search_value,this.i).subscribe(res=>{
          this.news = this.news.concat(res.news)
          this.length += 10
        })
      }else{
        console.log('No More Data');
        this.data_finish = true
        event.target.disabled = true;
      }
      

      if (this.news.length == 1000) {
        event.target.disabled = true;
      }
    }, 2000);
    this.i += 1
  }

  search(v){
    console.log(v)
    this.router.navigate(['/searched-news'], { queryParams: { value: v } })
    location.reload();
  }

}
