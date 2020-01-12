import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.page.html',
  styleUrls: ['./postdetails.page.scss'],
})
export class PostdetailsPage implements OnInit {
  dataAvailable = false
  
  news_liked = false
  news_bookmarked = false
  news = {
    id: null,
    image_url: '/assets/placeholder.png',
    author: '',
    published_at: '',
    title: '',
    content:'',
    description:'',
    source_name:'',
    like_count : null,
    share_count : null,
  }

  related_news = [
    {
      id: null,
      source_name:'',
      title: '',
    }
  ]
  constructor(
    public newsService: NewsService,
    public route: ActivatedRoute,
    public storage: Storage,
    public router: Router,
    public toastCtrl: ToastController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getNews(id).subscribe(res=>{
      console.log(res.related_news);
      this.news = res.news
      this.related_news = res.related_news
      this.dataAvailable = true
      console.log(this.news)
    })
    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.checkNewsStatus(userID,id).subscribe(res=>{
          console.log(res);
          if(res.news_status.like_news == '1'){
            this.news_liked = true
          }
          if(res.news_status.bookmark_news == '1'){
            this.news_bookmarked = true
          }
        })
      }
    })
    


  }

  like(post_id){
    //alert(post_id);
    this.storage.get('user_id').then((userID)=>{
      if(userID){
        this.newsService.like(userID,post_id).subscribe(res=>{
          console.log(res)
        })
        this.news.like_count = +this.news.like_count + 1
        this.news_liked = true
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
        this.news.like_count = +this.news.like_count - 1
        this.news_liked = false
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
          if(res){
            this.news_bookmarked = true;
          }
        })
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
          if(res){
            this.news_bookmarked = false
          }
        })
        this.presentToast('News removed from your bookmark')
        
      }else{
        this.router.navigateByUrl('login')
      }
    })
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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

}
