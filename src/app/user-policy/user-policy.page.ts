import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../services/policy.service';

@Component({
  selector: 'app-user-policy',
  templateUrl: './user-policy.page.html',
  styleUrls: ['./user-policy.page.scss'],
})
export class UserPolicyPage implements OnInit {
  aggrement = []
  dataAvailable = false
  constructor(
    public policyService:PolicyService
  ) { }

  ngOnInit() {
    this.policyService.getUserAgreement().subscribe(res=>{
      if(res.status == 200){
        this.aggrement = res.user_agreement
        this.dataAvailable = true
      }
      
    })
  }

}
