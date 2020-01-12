import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, Events } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  //authenticationService: any;
  // storage: any;
  // events: any;
  // router: any;
  hasError = false
  constructor(
    public loadingController: LoadingController,
    public authenticationService: AuthenticationService,
    public storage: Storage,
    public router: Router,
    public events: Events,
  ) { }

  ngOnInit() {
  }

  signup(form: NgForm){
    console.log(form.value)
    
    if(form.value.password === form.value.conf_password){
      console.log('pass matched');
      this.authenticationService.userReg(form.value.name,form.value.email,form.value.password).subscribe((res)=>{
        console.log(res);
        this.storage.set('normal_user',
        {
          id: res.normal_user.id,
          name: res.normal_user.name,
          email: res.normal_user.email,
          picture: '',
          google_id: null,
          login_by: 'n'
        })
        .then(() =>{
          this.router.navigate(["tabs/tab5"]);
          this.loadingController.dismiss();
        }, error =>{
          console.log(error);
          this.loadingController.dismiss();
        })

        this.events.publish('normal_user', res.normal_user);
        this.storage.set('user_id',res.normal_user.id)
        this.events.publish('user_id',res.normal_user.id);
        this.events.publish('login_by', 'n');
      })
    }else{
      console.log('pass didnt matched')
      //form.reset()
      this.hasError = true
      setTimeout(() => {
        this.hasError = false
      }, 3000);
      return
    }
    
    
  }

  // presentLoading(loading) {
	// 	return  loading.present();
	// }

}
