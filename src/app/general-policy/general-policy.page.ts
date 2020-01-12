import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../services/policy.service';


@Component({
  selector: 'app-general-policy',
  templateUrl: './general-policy.page.html',
  styleUrls: ['./general-policy.page.scss'],
})
export class GeneralPolicyPage implements OnInit {
  dataAvailable = false
  policy = []
  constructor(
    public policyService: PolicyService
  ) { }

  ngOnInit() {
    this.policyService.getPolicy().subscribe(res=>{
      if(res){
        this.policy = res.privacy_policy
        this.dataAvailable = true
      }
    })
  }

}
