import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { UserData } from '../models/loginuser.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})


export class Tab5Page implements OnInit {

  login_status = false;
  login_by = ''
  user_info: UserData = {
    name: '',
    email: '',
    id: '',
    picture: '',
  }

  mosque_user: null;
  
  constructor(
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public storage: Storage,
    public events: Events, 
    private router: Router,
    public socialsharing: SocialSharing,
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    
    this.storage.get('facebook_user').then((data)=>{
      if(data){
        console.log("data from storage",data)
        this.user_info = data
        this.login_by = data.login_by
        this.login_status = true;
      }
    })
    this.storage.get('google_user').then((data)=>{
      if(data){
        console.log("data from storage",data)
        this.user_info = data
        this.login_by = data.login_by
        this.login_status = true;
      }
    })
    this.storage.get('normal_user').then((data)=>{
      if(data){
        console.log("data from storage",data)
        this.user_info.id = data.id
        this.user_info.name = data.name
        this.user_info.email = data.email
        this.login_by = data.login_by
        this.login_status = true;
      }
    })
    
    this.events.subscribe('facebook_user', (res) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      if(res){
        console.log("data from event",res);
        this.user_info = res
        this.login_status = true;
      }
    });
    

    this.events.subscribe('google_user', (res) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      if(res){
        console.log("data from event",res);
        this.user_info.name = res.displayName
        this.user_info.email = res.email
        this.user_info.id = res.userId
        this.user_info.picture = res.imageUrl
        // this.user_info = res
        this.login_status = true;
      }
    });
    this.events.subscribe('normal_user', (res) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      if(res){
        console.log("data from event",res);
        this.user_info.id = res.id
        this.user_info.name = res.name
        this.user_info.email = res.email
        this.login_status = true;
      }
    });

    this.events.subscribe('login_by', (res) => {
      if(res){
        this.login_by = res
      }
    });
    console.log(this.user_info)

    
    this.events.subscribe('mosque_user_id',(m_usr)=>{
      if(m_usr){
        this.mosque_user = m_usr;
      }else if(m_usr == 0){
        this.mosque_user = null;
      }
    })
    this.storage.get('mosque_user_id').then((m_user)=>{
      if(m_user){
        this.mosque_user = m_user;
      }
    })
  }

  Logout(){
    console.log('m00mm')
        console.log('lll',this.login_by)
        if(this.login_by == 'f'){
          console.log('fb logout');
          this.fb.logout()
          .then(res =>{
            //user logged out so we will remove him from the NativeStorage
            
            this.storage.remove('facebook_user');
            this.storage.remove('user_id');
            this.storage.remove('login_by');
            this.login_status = false;

            this.router.navigate(["tabs/tab5"]);
          }, error =>{
            console.log(error);
          });
        }else if(this.login_by == 'g'){
          console.log('google logout');
          this.googlePlus.logout()
          .then(res =>{
            //user logged out so we will remove him from the NativeStorage
            this.storage.remove('google_user');
            this.storage.remove('user_id');
            this.storage.remove('login_by');
            this.login_status = false;
      
            this.router.navigate(["tabs/tab5"]);
          }, err =>{
            console.log(err);
          })
        }else if(this.login_by == 'n'){
          this.storage.remove('normal_user');
            this.storage.remove('user_id');
            this.storage.remove('login_by');
            this.login_status = false;
      
            this.router.navigate(["tabs/tab5"]);
        }
      
    this.storage.get('user_id').then(id=>{
      this.storage.get('user_token').then(token=>{
        console.log(id)
        console.log(token)
        if(token){
          this.authenticationService.removeToken(id,token).subscribe(res=>{
            console.log(res)
          })
        }else{
          this.authenticationService.removeToken(id,null).subscribe(res=>{
            console.log(res)
          })
        }
      })
    })
    
    
    
  }
  

  share(){
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      appPackageName: 'io.ionic.prayer' // Android only, you can provide id of the App you want to share with
    };
    // var onSuccess = function(result) {
    //   console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    //   console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    // };
    
    // var onError = function(msg) {
    //   console.log("Sharing failed with message: " + msg);
    // };

    this.socialsharing.shareWithOptions(options);
  }

  onNotify(){
    this.storage.get('user_id').then(id=>{
      if(id){
        this.router.navigateByUrl('/notify')
      }else{
        this.router.navigateByUrl('/login')
      }
    })
  }

  

}
