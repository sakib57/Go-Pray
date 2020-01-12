import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader/ngx';
import { environment } from 'src/environments/environment';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-sura',
  templateUrl: './sura.page.html',
  styleUrls: ['./sura.page.scss'],
})

export class SuraPage implements OnInit {
  domain = environment.domain
  domain2 = environment.domain2
  sura_no = ''
  dnld_sura_no
  dnld_verse_no = ''
  data = {
    number:'',
    transliteration_en : '',
    translation_en: '',
    name: '',
    revelation_type:'',
    verses:[]
  }
  active_item = null
  isPlaying = false
  isDownloading = false
  
constructor(
  public route: ActivatedRoute,
  public downloader: Downloader,
  public file: File
) { }



 public buttonClicked: boolean = false;
    public onButtonClick(i,sura_no,verse_no) {
      this.dnld_sura_no = sura_no
      this.dnld_verse_no = verse_no
      console.log(sura_no," ",verse_no)
        this.active_item = i
        this.buttonClicked = !this.buttonClicked;
        if(this.buttonClicked){
          this.isPlaying = false
        }
    }
     

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.sura_no = this.route.snapshot.paramMap.get('id')
    //console.log(this.sura_no)
    fetch(`./assets/quran/${this.sura_no}.json`).then(res => res.json())
    .then(json => {
      this.data = json;
      console.log(this.data)
    });
  }

  play(){
    this.isPlaying = true
    this.isDownloading = true

    var request: DownloadRequest = {
        uri: `${this.domain2}assets/quran/${this.dnld_sura_no}_${this.dnld_verse_no}.mp3`,
        title: 'mm',
        description: '',
        mimeType: '',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
            dirType: 'Downloads',
            subPath: this.file.externalDataDirectory+'/sakib/mm.mp3'
        }
    };


    this.downloader.download(request)
    .then((location: string) => {
      console.log('File downloaded at:'+location)
    })
    .catch((error: any) => {
      console.error(error)
    });

    setInterval(() => {
      this.isDownloading = false
    },3000)
    console.log('Play Clicked')
  }



  pause(){
    this.isPlaying = false
  }

}
