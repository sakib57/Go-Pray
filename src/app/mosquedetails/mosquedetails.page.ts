import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Storage } from '@ionic/storage';
import { AlertController, Events } from '@ionic/angular';
import { MosqueService } from '../services/mosque.service';
import { MosqueDetail } from '../models/mosquedetail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NotificationService } from '../services/notification.service';
import { ToastController } from '@ionic/angular';
import { PrayerService } from '../services/prayer.service';

@Component({
  selector: 'app-mosquedetails',
  templateUrl: './mosquedetails.page.html',
  styleUrls: ['./mosquedetails.page.scss'],
})
export class MosquedetailsPage implements OnInit {
  abc = 'home';
  prefarble = null

  mosqueId = null

  image = '/assets/placeholder.png'
  currentDate = new Date().toISOString().slice(0,10)
  lattitude = -33.865143
  longitude = 151.209900
  mosqueDetail : MosqueDetail =(
    {
      mosque_details:{
        id: null,
        name : '',
        description: '',
        location: '',
        main_image: '',
        facebook: '',
        email: '',
        phone: null,
        website: '',
        facilities: '',
        latitude: null,
        longitude: null
      },
      jummah_time:'',
      prayer_times:{
        0:{
          time: ''
        },
        1:{
          time: ''
        },
        2:{
          time: ''
        },
        3:{
          time: ''
        },
        4:{
          time: ''
        },
      },
      additional_images:[],
      committee_members:[]
    }
  )
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
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    private streamingMedia: StreamingMedia, 
    public events: Events, 
    public storage: Storage, 
    public alertController: AlertController,
    public mosqueService: MosqueService,
    private route: ActivatedRoute,
    private push: Push,
    public notificationService: NotificationService,
    public router: Router,
    public toastController: ToastController,
    private geolocation: Geolocation,
    public prayerService: PrayerService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){

    this.storage.get('prayerLat').then((asd)=>{
      this.storage.get('prayerLng').then((res)=>{
        if(asd){
          this.prayerLat = asd
          this.prayerLng = res
          this.getSchedulebyLocation(asd,res,this.currentDate);
        }else{
          this.getSchedulebyLocation(this.lattitude,this.longitude,this.currentDate);
        }
        console.log('prayer lat',this.prayerLat);
        
        if(!asd){
          this.geolocation.getCurrentPosition().then((resp) => {
            if(resp){
              this.storage.set('prayerLat',resp.coords.latitude)
              this.storage.set('prayerLng',resp.coords.longitude)
              this.prayerLat = resp.coords.latitude
              this.prayerLng = resp.coords.longitude
              this.getSchedulebyLocation(resp.coords.latitude,resp.coords.longitude,this.currentDate);
            }
           }) 
        }
        
      })
    })
    
      this.mosqueId = this.route.snapshot.paramMap.get('mosqueId');
      this.mosqueService.msqDetail(this.mosqueId).subscribe((res)=>{
        console.log(res);
        this.mosqueDetail = res;
        this.image = 'http://optest.therssoftware.com/prayer_app/'+res.mosque_details.main_image
        console.log('m_name',res.mosque_details.name);
      })
    
    // this.storage.get('prefarble').then((id)=>{
    //   this.prefarble = id;
    // })

    this.storage.get('user_id').then((userID)=>{
      console.log("uuu_id",userID);
      if(userID != null){
        this.mosqueService.getPref(userID).subscribe(res=>{
          console.log('hhhhh',res)
          this.prefarble = res.mosque_id
        })
      }
      
    })

    
  }

  openMap(){
    this.router.navigate(['google-map',{name:this.mosqueDetail.mosque_details.name,lat:this.mosqueDetail.mosque_details.latitude,lng:this.mosqueDetail.mosque_details.longitude}])
  }
  openMap2(){
    this.router.navigate(['map2',{name:this.mosqueDetail.mosque_details.name,lat:this.mosqueDetail.mosque_details.latitude,lng:this.mosqueDetail.mosque_details.longitude}])
  }
  openLiveVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };

    this.streamingMedia.playVideo('https://www.youtube.com/watch?v=r9o1QS-itsU', options);
  }

//===============================================================
  selectedPrefarableMosjid(id:any) {
    console.log("m_id",id);

    this.storage.get('user_id').then((userID)=>{
      console.log("uuu_id",userID);
      if(userID){
        // this.storage.set('prefarble', id).then(res => {
        //   //this.presentAlert('This mosque is set as prefered')
        //   this.presentToast('Mosque is set as prefered')
        //   this.events.publish('prefarble',id);
        // })
        this.mosqueService.setPref(userID,id).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            this.presentToast('Mosque is set as prefered')
            this.events.publish('prefarble',id);
          }
          
        })
    
        this.events.subscribe('prefarble', (prefarble) => {
          if (prefarble) {
            this.prefarble = prefarble;
          }
        });
    
        this.sendNotification(userID,id);
      }else{
        this.router.navigateByUrl('login');
      }
      
    })
    

  }

//=====================================================================

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }


  sendNotification(user_id: number,mosque_id: number){
    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
    }).then(() => console.log('Channel created'));
    
    // Delete a channel (Android O and above)
    // this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
    
    // Return a list of currently configured channels
    this.push.listChannels().then((channels) => console.log('List of channels', channels))
    
    // to initialize push notifications
    
    const options: PushOptions = {
        android: {},
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
      //this.router.navigateByUrl('/notify')
      console.log('Received a notification', notification)
    });
    
    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      

      this.notificationService.updateFirbaseNotificationToken(user_id,mosque_id,registration.registrationId).subscribe((res)=>{
        console.log(res);
      })
      
    });
    
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
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
    })
  }
}
