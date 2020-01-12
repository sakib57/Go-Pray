import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Fbpicture } from '../models/fbimg.model';
import { AuthenticationService } from '../services/authentication.service';
import { MosqueService } from '../services/mosque.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private googlePlus: GooglePlus,
    private fb: Facebook,
    public loadingController: LoadingController,
    public storage: Storage,
	public router: Router,
	public events: Events,
	public http: HttpClient,
	public authenticationService: AuthenticationService,
	public mosqueService: MosqueService,
	private push: Push,
	public notificationService: NotificationService,
  ) { }

  ngOnInit() {
  }

  
  async doFbLogin(){
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);
		//let permissions = new Array<string>();

		//the permissions your facebook app needs from the user
    const permissions = ["public_profile", "email"];

		this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;

			//Getting name and gender properties
			this.fb.api("/me?fields=name,email", permissions)
			.then(user =>{
				// user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
				this.http.get<Fbpicture>(`https://graph.facebook.com/v4.0/${userId}/picture?type=large&redirect=0`).subscribe((res)=>{
					console.log("response",res);
					user.picture = res.data.url
					console.log("imgurl",res.data.url);

					//==========================
					console.log("u_name",user.name);
					console.log("u_email",user.email);
					console.log("u_pic",res.data.url);
					console.log("u_id",userId);

					this.storage.set('facebook_user',
					{
						name: user.name,
						email: user.email,
						picture: res.data.url,
						fb_id: userId,
						login_by: 'f'
					})
					.then(() =>{
						this.router.navigate(["tabs/tab5"]);
						loading.dismiss();
					}, error =>{
						console.log(error);
						loading.dismiss();
					})

					this.events.publish('facebook_user', user);
					this.events.publish('login_by', 'f');
					
					this.authenticationService.fbBackendLogin(user.name,user.email,user.picture,userId).subscribe((postData)=>{
						console.log('backend fb login res:',postData.normal_user.id);
						this.events.publish('user_id',postData.normal_user.id);
						this.storage.set('user_id',postData.normal_user.id).then((r)=>{
							console.log(r);
						})
						this.updateNotifyToken(postData.normal_user.id)
					});
				})
				//now we have the users info, let's save it in the NativeStorage
				

				
				

				
        //console.log(user);
        //loading.dismiss();
			})
		}, error =>{
			console.log(error);
			loading.dismiss();
		});
	}

	async presentLoading(loading) {
		return await loading.present();
	}

  async googleLogin(){
	const loading = await this.loadingController.create({
		message: 'Please wait...'
	});
	this.presentLoading(loading);
    console.log("in login google")
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
		  'webClientId': '198611313401-msrlhhrb5iuokfe75b6nf0otua7ohsnr.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
		  'offline': true 
    })
      .then(user => {
		this.storage.set('google_user',
		{
			name: user.displayName,
			email: user.email,
			picture: user.imageUrl,
			google_id: user.userId,
			login_by: 'g'
		})
		.then(() =>{
			this.router.navigate(["tabs/tab5"]);
			loading.dismiss();
		}, error =>{
			console.log(error);
			loading.dismiss();
		})

		this.events.publish('google_user', user);
		this.events.publish('login_by', 'g');
		
		this.authenticationService.googleBackendLogin(user.displayName,user.email,user.imageUrl,user.userId).subscribe((postData)=>{
			console.log('backend fb login res:',postData.normal_user.id);
			this.events.publish('user_id',postData.normal_user.id);
			this.storage.set('user_id',postData.normal_user.id).then((r)=>{
				console.log(r);
			})
			this.updateNotifyToken(postData.normal_user.id)
		});
	  },error=>{
		console.log(error);
		loading.dismiss();
	  })
      .catch(err => console.error('error',err));
  }


  updateNotifyToken(userId){
	this.mosqueService.getPref(userId).subscribe(res=>{
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
		pushObject.on('registration').subscribe((registration: any) => {
			console.log(registration.registrationId)
			this.storage.set('user_token',registration.registrationId)
			console.log('Device registered', registration);
			this.notificationService.updateFirbaseNotificationToken(+userId,res.mosque_id,registration.registrationId).subscribe((res)=>{
			  console.log(res);
			})
		});
	})
  }

}
