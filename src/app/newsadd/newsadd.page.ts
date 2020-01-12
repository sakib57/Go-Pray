import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { Events,ActionSheetController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-newsadd',
  templateUrl: './newsadd.page.html',
  styleUrls: ['./newsadd.page.scss'],
})
export class NewsaddPage implements OnInit {

  base64img:string='';
  mosque_id = null
  notice_flag = null

  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public events: Events,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
  ) { }

  ngOnInit() {
    this.mosque_id = this.route.snapshot.paramMap.get('id');
    
  }

  onsubmit(form){
    console.log(form.value)
    console.log('image',this.base64img)

    this.mosqueService.addNews(this.mosque_id,form.value.news,this.base64img,form.value.title,form.value.sub_title).subscribe((res)=>{
      console.log(res);
        this.router.navigate(['/newslist',this.mosque_id])
    })


    

    
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

}
