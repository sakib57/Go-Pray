import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Events, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { MosqueService } from '../services/mosque.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-newsedit',
  templateUrl: './newsedit.page.html',
  styleUrls: ['./newsedit.page.scss'],
})
export class NewseditPage implements OnInit {
  base64img:string='';
  news = {
    title:'',
    sub_title :'',
    news :'',
    news_image : '',
    id : null,
    mosque_id: null
  }
  mosque_id = null
  notice_flag = null
  
  dataAvailable = false
  isloading = false

  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public events: Events,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
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


    this.route.queryParams.subscribe((res)=>{
      console.log('qqqqqq',res)
      this.mosque_id = res.mosque_id
    })
    const news_id = this.route.snapshot.paramMap.get('id');
    this.mosqueService.getNewsDetail(news_id).subscribe((res)=>{
      console.log("www",res);
      if(res.status = 200){
        this.dataAvailable = true
        this.isloading = false
        this.loadingCtrl.dismiss()

        this.news.title = res.news.title
        this.news.sub_title = res.news.sub_title
        this.news.news = res.news.news
        this.news.news_image = res.news.news_image
        this.news.id = res.news.id
        
        
        
      }else{
        this.isloading = false
        this.loadingCtrl.dismiss()
      }
      
    })
  }

  onsubmit(form){
    if(form.valid){
      console.log('newsId',this.news.id)
      console.log(form.value)
      console.log('image',this.base64img)

      this.mosqueService.updateNews(this.news.id,form.value.news,this.base64img,form.value.title,form.value.sub_title).subscribe((res)=>{
        console.log(res);
        if(res.status == 200){
          this.router.navigate(['/newsdetails',this.news.id],{queryParams:{mosque_id:this.mosque_id}})
        }else{
          console.log('Update Error')
          this.presentAlert('This news no longer available').then(()=>{
            this.router.navigateByUrl('//user-mosque-list')
          })
        }
        
      })
    }

    
  }
  async openActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image',
      buttons: [{
        text: 'Open Gallery',
        icon: 'image',
        handler: () => {
          this.imageCapturedGallery();
        }
      }, {
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          this.imageCaptured();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }



  imageCaptured(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      console.log("From camera",this.base64img);
   }),error=>{
     console.log(error);
   })
  }

  imageCapturedGallery(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      console.log("From Gallery",this.base64img);
    }),error=>{
      console.log(error);
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
