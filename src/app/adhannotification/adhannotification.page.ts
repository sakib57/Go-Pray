import { Component, OnInit } from '@angular/core';
import { PrayerService } from '../services/prayer.service';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-adhannotification',
  templateUrl: './adhannotification.page.html',
  styleUrls: ['./adhannotification.page.scss'],
})
export class AdhannotificationPage implements OnInit {
  alerm_sound = 'default'

  alermStatus = "1"
  //-----------------------
  wakt: string
  // imsakAlerm = 1
  // fajrAlerm  = 1
  // sunriseAlerm = 1
  // zuhrAlerm = 1
  // asrAlerm = 1
  // maghribAlerm = 1
  // sunsetAlerm = 1
  // ishaAlerm = 1

  alermValue = 1

  defaultPlaying = false
  quattamiPlaying = false
  hijajPlaying = false
  nahawanPlaying = false

  Imsak: string
  Fajr: string
  Sunrise: string
  Zuhr: string
  Asr: string
  Maghrib: string
  Sunset: string
  Isha: string

  constructor(
    public prayerService: PrayerService,
    public storage: Storage,
    private localNotifications: LocalNotifications,
    private filePath: FilePath,
    private file: File,
    public router: Router,
    public events: Events,
    private media: Media,
    private nativeAudio: NativeAudio
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.storage.get('wakt').then((val) => {
      //console.log('wakttt',val)
      this.wakt = val
      switch(val){
        case 'Imsak':
          this.storage.get('imsakAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
            
          });
          break;
        case 'Fajr':
          this.storage.get('fajrAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
        case 'Sunrise':
          this.storage.get('sunriseAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
        case 'Zuhr':
          this.storage.get('zuhrAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
        case 'Asr':
          this.storage.get('asrAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
        case 'Maghrib':
          this.storage.get('maghribAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
        case 'Sunset':
          this.storage.get('sunsetAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
        case 'Isha':
          this.storage.get('ishaAlarm').then((val) => {
            if(val){
              this.alermStatus = val
            }
          });
          break;
      }

      console.log("after switch")
      console.log(this.alermStatus)


    });

    // this.storage.get('imsak').then((val) => {
    //   this.imsakAlerm = val
    //   console.log("from promise",this.imsakAlerm)
    // });

    //console.log("out promise",this.imsakAlerm)
    this.storage.get('wakt').then((res) => {
      switch(res){
        case 'Imsak':
          this.storage.get('alerm_sound_imsak').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
        case 'Fajr':
          this.storage.get('alerm_sound_fajr').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
        case 'Sunrise':
          this.storage.get('alerm_sound_sunrise').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
        case 'Zuhr':
          this.storage.get('alerm_sound_zuhr').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
        case 'Asr':
          this.storage.get('alerm_sound_asr').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
        case 'Maghrib':
          this.storage.get('alerm_sound_maghrib').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
        case 'Isha':
          this.storage.get('alerm_sound_isha').then((val) => {
            if(val){
              this.alerm_sound = val
            }
          })
          break
      }
    })
    
    
    
  }

  onNotificationChange(f){
  //  this.imsakAlerm = f
  //  this.fajrAlerm = f
  //  this.zuhrAlerm = f
  //  this.asrAlerm = f
  //  this.maghribAlerm = f
  //  this.sunsetAlerm = f
  //  this.ishaAlerm = f

   this.alermValue = f
    let that = this;
   this.storage.get('wakt').then((val) => {
    switch(val){
      case 'Imsak':
          this.storage.set('imsakAlarm',this.alermValue);
          this.events.publish('imsakAlarm',this.alermValue);
          break;
      case 'Fajr':
          this.storage.set('fajrAlarm',this.alermValue)
          this.events.publish('fajrAlarm',this.alermValue);
          this.localNotifications.schedule({
            title: 'Local ILocalNotification Example',
            text: 'Delayed ILocalNotification',
            trigger: {at: new Date(new Date().getTime() + 3000)},
            sound: that.file.applicationDirectory + 'www/assets/alarm/alarm.mp3',
         });
          break;
      case 'Sunrise':
        this.storage.set('sunriseAlarm',this.alermValue)
        this.events.publish('sunriseAlarm',this.alermValue);
        break;
      case 'Zuhr':
        this.storage.set('zuhrAlarm',this.alermValue)
        this.events.publish('zuhrAlarm',this.alermValue);
        break;
      case 'Asr':
        this.storage.set('asrAlarm',this.alermValue)
        this.events.publish('asrAlarm',this.alermValue);
        break;
      case 'Maghrib':
        this.storage.set('maghribAlarm',this.alermValue)
        this.events.publish('maghribAlarm',this.alermValue);
        break;
      case 'Sunset':
        this.storage.set('sunsetAlarm',this.alermValue)
        this.events.publish('sunsetAlarm',this.alermValue);
        break;
      case 'Isha':
        this.storage.set('ishaAlarm',this.alermValue)
        this.events.publish('ishaAlarm',this.alermValue);
        break;
    }
   })
   
  }

  cng_alerm_sound(val){
    this.storage.get('wakt').then((res) => {
      switch(res){
        case 'Imsak':
          this.alerm_sound = val
          this.storage.set('alerm_sound_imsak',val)
          break
        case 'Fajr':
          this.alerm_sound = val
          this.storage.set('alerm_sound_fajr',val)
          break
        case 'Sunrise':
          this.alerm_sound = val
          this.storage.set('alerm_sound_sunrise',val)
          break
        case 'Zuhr':
          this.alerm_sound = val
          this.storage.set('alerm_sound_zuhr',val)
          break
        case 'Asr':
          this.alerm_sound = val
          this.storage.set('alerm_sound_asr',val)
          break
        case 'Maghrib':
          this.alerm_sound = val
          this.storage.set('alerm_sound_maghrib',val)
          break
        case 'Isha':
          this.alerm_sound = val
          this.storage.set('alerm_sound_isha',val)
          break
      }
    })
    console.log(val)
    
  }


  back(){
    console.log("back")
    //this.router.navigateByUrl('../tab3');
    this.router.navigate(['tabs/tab3'])
  }

  playDefault(){
    this.defaultPlaying = true
    this.quattamiPlaying = false
    this.hijajPlaying = false
    this.nahawanPlaying = false

    this.nativeAudio.stop('quattami');
    this.nativeAudio.stop('hijaj');
    this.nativeAudio.stop('nahawan');

    this.nativeAudio.preloadSimple('default', 'assets/azan/default.mp3').then(()=>{
      this.nativeAudio.play('default', () => console.log('uniqueId1 is done playing'));
    });
    this.nativeAudio.play('default', () => console.log('uniqueId1 is done playing'));
  }
  stopDefault(){
    this.defaultPlaying = false
    this.nativeAudio.stop('default');
  }

  playQuattami(){
    this.quattamiPlaying = true
    this.defaultPlaying = false
    this.hijajPlaying = false
    this.nahawanPlaying = false

    this.nativeAudio.stop('default');
    this.nativeAudio.stop('hijaj');
    this.nativeAudio.stop('nahawan');

    this.nativeAudio.preloadSimple('quattami', 'assets/azan/quattami.mp3').then(()=>{
      this.nativeAudio.play('quattami', () => console.log('uniqueId1 is done playing'));
    });
    this.nativeAudio.play('quattami', () => console.log('uniqueId1 is done playing'));

  }
  stopQuattami(){
    this.quattamiPlaying = false
    this.nativeAudio.stop('quattami');
  }

  playHijaj(){
    this.hijajPlaying = true
    this.quattamiPlaying = false
    this.defaultPlaying = false
    this.nahawanPlaying = false

    this.nativeAudio.stop('default');
    this.nativeAudio.stop('quattami');
    this.nativeAudio.stop('nahawan');
    this.nativeAudio.preloadSimple('hijaj', 'assets/azan/hijaj.mp3').then(()=>{
      this.nativeAudio.play('hijaj', () => console.log('uniqueId1 is done playing'));
    });
    this.nativeAudio.play('hijaj', () => console.log('uniqueId1 is done playing'));
  }
  stopHijaj(){
    this.hijajPlaying = false
    this.nativeAudio.stop('hijaj');
  }

  playNahawan(){
    this.nahawanPlaying = true
    this.quattamiPlaying = false
    this.defaultPlaying = false
    this.hijajPlaying = false

    this.nativeAudio.stop('default');
    this.nativeAudio.stop('quattami');
    this.nativeAudio.stop('hijaj');
    this.nativeAudio.preloadSimple('nahawan', 'assets/azan/nahawan.mp3').then(()=>{
      this.nativeAudio.play('nahawan', () => console.log('uniqueId1 is done playing'));
    });
    this.nativeAudio.play('nahawan', () => console.log('uniqueId1 is done playing'));
  }
  stopNahawan(){
    this.nahawanPlaying = false
    this.nativeAudio.stop('nahawan');
  }


}
