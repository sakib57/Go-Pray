import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MosqueService } from '../services/mosque.service';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.page.html',
  styleUrls: ['./committee.page.scss'],
})
export class CommitteePage implements OnInit {

  dataAvailable = false
  memberId = null

  mosqueId = null


  committee_member: {
    bio: ''
    id: null
    mosque_id: ''
    name: ''
    profile_image: ''
    title: ''
  }

  constructor(
    private route: ActivatedRoute,
    public mosqueService: MosqueService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe((res)=>{
      console.log('qqqqqq',res)
      this.mosqueId = res.mosque_id
    })



    this.memberId = this.route.snapshot.paramMap.get('id');
    this.mosqueService.committeeDetail(this.memberId).subscribe((res) => {
      //console.log(res);
      this.committee_member = res.committee_member;
      this.dataAvailable = true
      console.log('m_name',this.committee_member);
    })
  }

}
