import { Component, OnInit } from '@angular/core';
import { MosqueDetail } from '../models/mosquedetail.model';
import { ActivatedRoute } from '@angular/router';
import { MosqueService } from '../services/mosque.service';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.page.html',
  styleUrls: ['./committee-members.page.scss'],
})
export class CommitteeMembersPage implements OnInit {
  mosqueId = null
  mosqueDetail : MosqueDetail =(
    {
      mosque_details:{
        id: null,
        name : '',
        description: '',
        location: '',
        main_image: '',
        facebook: '',
        email: '',
        phone: null,
        website: '',
        facilities: '',
        latitude: null,
        longitude: null
      },
      jummah_time:'',
      prayer_times:{
        0:{
          time: ''
        },
        1:{
          time: ''
        },
        2:{
          time: ''
        },
        3:{
          time: ''
        },
        4:{
          time: ''
        },
      },
      additional_images:[],
      committee_members:[]
    }
  )
  constructor(
    private route: ActivatedRoute,
    public mosqueService: MosqueService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.mosqueId = this.route.snapshot.paramMap.get('id');
      this.mosqueService.msqDetail(this.mosqueId).subscribe((res)=>{
        console.log(res);
        this.mosqueDetail = res;
        console.log('m_name',res.mosque_details.name);
      })
  }

}
