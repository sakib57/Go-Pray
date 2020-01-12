import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selectprayertime',
  templateUrl: './selectprayertime.page.html',
  styleUrls: ['./selectprayertime.page.scss'],
})
export class SelectprayertimePage implements OnInit {
  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 400
  // };
  //aaaaa = '2012-12-15T01:47'
  notice_flag = null
  mosque_id = null
  isloading = false

  dataAvailable = false

  test = new Date()

  sat_date = ''
  sat_date_old = ''
  sat_fajr = ''
  sat_fajr_old = ''
  sat_zuhr = ''
  sat_zuhr_old = ''
  sat_asr = ''
  sat_asr_old = ''
  sat_maghrib = ''
  sat_maghrib_old = ''
  sat_isha = ''
  sat_isha_old = ''

  sun_date = ''
  sun_date_old = ''
  sun_fajr = ''
  sun_fajr_old = ''
  sun_zuhr = ''
  sun_zuhr_old = ''
  sun_asr = ''
  sun_asr_old = ''
  sun_maghrib = ''
  sun_maghrib_old = ''
  sun_isha = ''
  sun_isha_old = ''

  mon_date = ''
  mon_date_old = ''
  mon_fajr = ''
  mon_fajr_old = ''
  mon_zuhr = ''
  mon_zuhr_old = ''
  mon_asr = ''
  mon_asr_old = ''
  mon_maghrib = ''
  mon_maghrib_old = ''
  mon_isha = ''
  mon_isha_old = ''

  tue_date = ''
  tue_date_old = ''
  tue_fajr = ''
  tue_fajr_old = ''
  tue_zuhr = ''
  tue_zuhr_old = ''
  tue_asr = ''
  tue_asr_old = ''
  tue_maghrib = ''
  tue_maghrib_old = ''
  tue_isha = ''
  tue_isha_old = ''

  wed_date = ''
  wed_date_old = ''
  wed_fajr = ''
  wed_fajr_old = ''
  wed_zuhr = ''
  wed_zuhr_old = ''
  wed_asr = ''
  wed_asr_old = ''
  wed_maghrib = ''
  wed_maghrib_old = ''
  wed_isha = ''
  wed_isha_old = ''

  thu_date = ''
  thu_date_old = ''
  thu_fajr = ''
  thu_fajr_old = ''
  thu_zuhr = ''
  thu_zuhr_old = ''
  thu_asr = ''
  thu_asr_old = ''
  thu_maghrib = ''
  thu_maghrib_old = ''
  thu_isha = ''
  thu_isha_old = ''

  fri_date = ''
  fri_date_old = ''
  fri_fajr = ''
  fri_fajr_old = ''
  fri_zuhr = ''
  fri_zuhr_old = ''
  fri_asr = ''
  fri_asr_old = ''
  fri_maghrib = ''
  fri_maghrib_old = ''
  fri_isha = ''
  fri_isha_old = ''

  
  

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }
  
           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
           if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
  
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };

  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public loadingCtrl: LoadingController,
    public router:Router,
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
    this.mosqueService.mosquePrayerTime(this.mosque_id).subscribe((res)=>{
      if(res){
        console.log(res)

        //Saturday ==============================
        this.sat_date = res[0]['date']
        if(res[0]['prayer_time'] != ''){
          if(res[0]['prayer_time'][0]['time'] != ''){
            this.sat_fajr = this.getISOtime(this.sat_date, res[0]['prayer_time'][0]['time'])
          }
          if(res[0]['prayer_time'][1]['time'] != ''){
            this.sat_zuhr = this.getISOtime(this.sat_date,res[0]['prayer_time'][1]['time'])
          }
          if(res[0]['prayer_time'][2]['time'] != ''){
            this.sat_asr = this.getISOtime(this.sat_date,res[0]['prayer_time'][2]['time'])
          }
          if(res[0]['prayer_time'][3]['time'] != ''){
            this.sat_maghrib = this.getISOtime(this.sat_date,res[0]['prayer_time'][3]['time'])
          }
          if(res[0]['prayer_time'][4]['time'] != ''){
            this.sat_isha = this.getISOtime(this.sat_date,res[0]['prayer_time'][4]['time'])
          }
        }

        //Sunday ==============================
        this.sun_date =  res[1]['date']
        if(res[1]['prayer_time'] != ''){
          if(res[1]['prayer_time'][0]['time'] != ''){
            this.sun_fajr = this.getISOtime(this.sun_date,res[1]['prayer_time'][0]['time'])
          }
          if(res[1]['prayer_time'][1]['time'] != ''){
            this.sun_zuhr = this.getISOtime(this.sun_date,res[1]['prayer_time'][1]['time'])
          }
          if(res[1]['prayer_time'][2]['time'] != ''){
            this.sun_asr = this.getISOtime(this.sun_date,res[1]['prayer_time'][2]['time'])
          }
          if(res[1]['prayer_time'][3]['time'] != ''){
            this.sun_maghrib = this.getISOtime(this.sun_date,res[1]['prayer_time'][3]['time'])
          }
          if(res[1]['prayer_time'][4]['time'] != ''){
            this.sun_isha = this.getISOtime(this.sun_date,res[1]['prayer_time'][4]['time'])
          } 
        }

        //Monday ==============================
        this.mon_date =  res[2]['date']
        if(res[2]['prayer_time'] != ''){
          if(res[2]['prayer_time'][0]['time'] != ''){
            this.mon_fajr = this.getISOtime(this.mon_date,res[2]['prayer_time'][0]['time'])
          }
          if(res[2]['prayer_time'][1]['time'] != ''){
            this.mon_zuhr = this.getISOtime(this.mon_date,res[2]['prayer_time'][1]['time'])
          }
          if(res[2]['prayer_time'][2]['time'] != ''){
            this.mon_asr = this.getISOtime(this.mon_date,res[2]['prayer_time'][2]['time'])
          }
          if(res[2]['prayer_time'][3]['time'] != ''){
            this.mon_maghrib = this.getISOtime(this.mon_date,res[2]['prayer_time'][3]['time'])
          }
          if(res[2]['prayer_time'][4]['time'] != ''){
            this.mon_isha = this.getISOtime(this.mon_date,res[2]['prayer_time'][4]['time'])
          }
        }

        //Tuesday ==============================
        this.tue_date = res[3]['date']
        if(res[3]['prayer_time'] != ''){
          if(res[3]['prayer_time'][0]['time'] != ''){
            this.tue_fajr = this.getISOtime(this.tue_date,res[3]['prayer_time'][0]['time'])
          }
          if(res[3]['prayer_time'][1]['time'] != ''){
            this.tue_zuhr = this.getISOtime(this.tue_date,res[3]['prayer_time'][1]['time'])
          }
          if(res[3]['prayer_time'][2]['time'] != ''){
            this.tue_asr = this.getISOtime(this.tue_date,res[3]['prayer_time'][2]['time'])
          }
          if(res[3]['prayer_time'][3]['time'] != ''){
            this.tue_maghrib = this.getISOtime(this.tue_date,res[3]['prayer_time'][3]['time'])
          }
          if(res[3]['prayer_time'][4]['time'] != ''){
            this.tue_isha = this.getISOtime(this.tue_date,res[3]['prayer_time'][4]['time'])
          }
        }

        //Wednesday ==============================
        this.wed_date = res[4]['date']
        if(res[4]['prayer_time'] != ''){
          if(res[4]['prayer_time'][0]['time'] != ''){
            this.wed_fajr = this.getISOtime(this.wed_date,res[4]['prayer_time'][0]['time'])
          }
          if(res[4]['prayer_time'][1]['time'] != ''){
            this.wed_zuhr = this.getISOtime(this.wed_date,res[4]['prayer_time'][1]['time'])
          }
          if(res[4]['prayer_time'][2]['time'] != ''){
            this.wed_asr = this.getISOtime(this.wed_date,res[4]['prayer_time'][2]['time'])
          }
          if(res[4]['prayer_time'][3]['time'] != ''){
            this.wed_maghrib = this.getISOtime(this.wed_date,res[4]['prayer_time'][3]['time'])
          }
          if(res[4]['prayer_time'][4]['time'] != ''){
            this.wed_isha = this.getISOtime(this.wed_date,res[4]['prayer_time'][4]['time'])
          } 
        }

        //Thursday ==============================
        this.thu_date = res[5]['date']
        if(res[5]['prayer_time'] != ''){
          if(res[5]['prayer_time'][0]['time'] != ''){
            this.thu_fajr = this.getISOtime(this.thu_date,res[5]['prayer_time'][0]['time'])
          }
          if(res[5]['prayer_time'][1]['time'] != ''){
            this.thu_zuhr = this.getISOtime(this.thu_date,res[5]['prayer_time'][1]['time'])
          }
          if(res[5]['prayer_time'][2]['time'] != ''){
            this.thu_asr = this.getISOtime(this.thu_date,res[5]['prayer_time'][2]['time'])
          }
          if(res[5]['prayer_time'][3]['time'] != ''){
            this.thu_maghrib = this.getISOtime(this.thu_date,res[5]['prayer_time'][3]['time'])
          }
          if(res[5]['prayer_time'][4]['time'] != ''){
            this.thu_isha = this.getISOtime(this.thu_date,res[5]['prayer_time'][4]['time'])
          } 
        }
        

        //Friday ==============================
        this.fri_date = res[6]['date']
        if(res[6]['prayer_time'] != ''){
          if(res[6]['prayer_time'][0]['time'] != ''){
            this.fri_fajr = this.getISOtime(this.fri_date,res[6]['prayer_time'][0]['time'])
          }
          if(res[6]['prayer_time'][1]['time'] != ''){
            this.fri_zuhr = this.getISOtime(this.fri_date,res[6]['prayer_time'][1]['time'])
          }
          if(res[6]['prayer_time'][2]['time'] != ''){
            this.fri_asr = this.getISOtime(this.fri_date,res[6]['prayer_time'][2]['time'])
          }
          if(res[6]['prayer_time'][3]['time'] != ''){
            this.fri_maghrib = this.getISOtime(this.thu_date,res[6]['prayer_time'][3]['time'])
          }
          if(res[6]['prayer_time'][4]['time'] != ''){
            this.fri_isha = this.getISOtime(this.fri_date,res[6]['prayer_time'][4]['time'])
          } 
        }
        this.dataAvailable = true
      }

      this.isloading = false
      this.loadingCtrl.dismiss();
       
    })
  }

  onSubmitSat(form){
    
    if(form.valid){
      var date = this.sat_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.sat_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.sat_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.sat_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.sat_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.sat_isha
      var n_isha = isha.substr(11,5);

      this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
    
  }

  onSubmitSun(form){
    if(form.valid){
      var date = this.sun_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.sun_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.sun_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.sun_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.sun_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.sun_isha
      var n_isha = isha.substr(11,5);

      this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
    
  }

  onSubmitMon(form){
    if(form.valid){
      console.log(form.value)
      var date = this.mon_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.mon_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.mon_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.mon_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.mon_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.mon_isha
      var n_isha = isha.substr(11,5);

    this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
    
  }
  onSubmitTue(form){
    if(form.valid){
      var date = this.tue_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.tue_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.tue_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.tue_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.tue_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.tue_isha
      var n_isha = isha.substr(11,5);

    this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
    
  }
  onSubmitWed(form){
    if(form.valid){
      var date = this.wed_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.wed_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.wed_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.wed_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.wed_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.wed_isha
      var n_isha = isha.substr(11,5);

    this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
    
  }

  onSubmitThu(form){
    if(form.valid){
      var date = this.thu_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.thu_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.thu_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.thu_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.thu_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.thu_isha
      var n_isha = isha.substr(11,5);
  
     this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
   
  }
  onSubmitFri(form){
    if(form.valid){
      var date = this.fri_date
      var day_id = form.value.day_id.toString()
      var fajr = form.value.fri_fajr
      var n_fajr = fajr.substr(11,5);
      var zuhr = form.value.fri_zuhr
      var n_zuhr = zuhr.substr(11,5);
      var asr = form.value.fri_asr
      var n_asr = asr.substr(11,5);
      var maghrib = form.value.fri_maghrib
      var n_maghrib = maghrib.substr(11,5);
      var isha = form.value.fri_isha
      var n_isha = isha.substr(11,5);

    this.mosqueService.updatePrayerTime(this.mosque_id,day_id,date,n_fajr,n_zuhr,n_asr,n_maghrib,n_isha).subscribe((res)=>{
        console.log(res)
        if(res.status == 200){
          this.router.navigate(['/mosquedashboard',this.mosque_id])
        }else{
          this.presentAlert('This mosque no longer available').then(()=>{
            this.router.navigateByUrl('/user-mosque-list')
          })
        }
      })
    }else{
      console.log('form not valid')
      this.presentAlert('Please fill up all field')
    }
    
  }


  getISOtime(date,time){
    if( time){
      let q  = time.match(/\d+/g)
      let f_hr = q[0]
      let f_mn = q[1]
      let n_hr = ("0" + f_hr).slice(-2);
      var final_time = date+"T"+n_hr.toString()+":"+f_mn
      return final_time
    }
        
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
