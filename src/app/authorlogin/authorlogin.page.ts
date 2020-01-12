import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authorlogin',
  templateUrl: './authorlogin.page.html',
  styleUrls: ['./authorlogin.page.scss'],
})
export class AuthorloginPage implements OnInit {

  hasError = false
  constructor(
    public authenticationService: AuthenticationService,
    public storage: Storage,
	  public events: Events,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  login(form: NgForm){
    this.authenticationService.mosqueOwnerLogin(form.value.email,form.value.password).subscribe((res)=>{
      console.log(res.status);
      this.storage.set('mosque_user_id',res.user_id).then((r)=>{
        console.log(r);
      })
      this.events.publish('mosque_user_id',res.user_id);
      if(res.status == 200){
        this.router.navigateByUrl('user-mosque-list')
      }else{
        this.hasError = true
        setTimeout(() => {
          this.hasError = false
        }, 3000);
        return
      }

    })
  }

}
