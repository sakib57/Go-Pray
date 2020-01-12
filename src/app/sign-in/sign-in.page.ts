import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  // authenticationService: any;
  // storage: any;
  // events: any;
  // router: any;
  hasError = false

  constructor(
    public authenticationService: AuthenticationService,
    public storage: Storage,
    public router: Router,
    public events: Events,
  ) { }

  ngOnInit() {
  }

  login(form: NgForm){
    this.authenticationService.userLogin(form.value.email,form.value.password).subscribe((res)=>{
      console.log(res);
      this.hasError = true
      if(res.status == 500){
        return
      }else{
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
        }, error =>{
          console.log(error);
        })

        this.events.publish('normal_user', res.normal_user);
        this.storage.set('user_id',res.normal_user.id)
        this.events.publish('user_id',res.normal_user.id);
        this.events.publish('login_by', 'n');

        this.hasError = false
      }
    })
    
    setTimeout(() => {
      this.hasError = false
    }, 3000);
  }

}
