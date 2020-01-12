import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MosqueService } from '../services/mosque.service';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Httpd } from '@ionic-native/httpd/ngx';
import { MediaCapture} from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-mosquedashboard',
  templateUrl: './mosquedashboard.page.html',
  styleUrls: ['./mosquedashboard.page.scss'],
})
export class MosquedashboardPage implements OnInit {

  isloading = false
  notice_flag = null

  mosque_id = null
  mosque_name = ''
  moaque_img = ''
  constructor(
    public route: ActivatedRoute,
    public mosqueService: MosqueService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public httpd: Httpd,
    public mediaCapture: MediaCapture,
    public plt: Platform,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isloading = true
    this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEL)=>{
      loadingEL.present();
    })
    this.mosque_id = this.route.snapshot.paramMap.get('id');
    console.log(this.mosque_id);
    this.mosqueService.mosqueInfo(this.mosque_id).subscribe((res)=>{
      console.log(res)
      if(res.status == 200){
        this.mosque_name = res.mosque_details.name
        this.moaque_img = res.mosque_details.main_image
        
      } 
      this.isloading = false
      this.loadingCtrl.dismiss();
    })
  }
  async goLive(){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Sure to go live?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            //this.commetChat()
          }
        }
      ]
    });

    await alert.present();
  }

  // videoStreem(){
  //   this.plt.ready().then(()=>{
  //     let options: HttpdOptions = {
  //       www_root: 'httpd_root', // relative path to app's www directory
  //       port: 8080,
  //       localhost_only: false
  //   }
   
  //       this.httpd.startServer(options).subscribe((data) => {
  //         console.log('Server is live');
  //         this.captureVideo()
  //       });
  //   })
    
  // }

  // captureVideo(){
  //   // capture callback
  //   // var captureSuccess = function(mediaFiles) {
  //   //   var i, path, len;
  //   //   for (i = 0, len = mediaFiles.length; i < len; i += 1) {
  //   //       path = mediaFiles[i].fullPath;
  //   //       // do something interesting with the file
  //   //   }
  //   // };

  //   // capture error callback
  //   // var captureError = function(error) {
  //   //   //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  //   // };

  //   // start video capture
  //   let options: CaptureImageOptions = { limit: 3 }
  //   this.mediaCapture.captureVideo(options);
  // }

  // commetChat(){
  //   var appId = "83818cb74c5968";
  //   CometChat.init(appId).then(
  //     () => {
  //       console.log("Initialization completed successfully");
  //       this.auth()
  //     },
  //     error => {
  //       console.log("Initialization failed with error:", error);
  //       //Check the reason for error and take apppropriate action.
  //     }
  //   );
  // }

  // auth(){
  //   var UID = "SUPERHERO1";
  //   var apiKey = "e006a63c57445c7c3b0e3219240560b1614494a4";

  //   CometChat.login(UID, apiKey).then(
  //     User => {
  //       console.log("Login Successful:", { User });
  //       this.createGroup()
  //       this.initCall();
  //     },
  //     error => {
  //       console.log("Login failed with exception:", { error });
  //       // User login failed, check error and take appropriate action.
  //     }
  //   );
  // }

  // initCall(){
  //   var receiverID = "SUPERHERO2";
  //   var callType = CometChat.CALL_TYPE.VIDEO;
  //   var receiverType = CometChat.RECEIVER_TYPE.USER;

  //   var call = new CometChat.Call(receiverID, callType, receiverType);

  //   CometChat.initiateCall(call).then(
  //     outGoingCall => {
  //       console.log("Call  successfully:", outGoingCall);
  //       // perform action on success. Like show your calling screen.
  //       //this.startCall()
  //     },
  //     error => {
  //       console.log("Call initialization faileinitiatedd with exception:", error);
  //     }
  //   );
  // }

  // createGroup(){
  //   var GUID = "GUID";
  //   var groupName = "Hello Group!";
  //   var groupType = CometChat.GROUP_TYPE.PUBLIC;
  //   var password = "";

  //   var group = new CometChat.Group(GUID, groupName, groupType, password);

  //   CometChat.createGroup(group).then(
  //     group => {
  //       console.log("Group created successfully:", group);
  //     },
  //     error => {
  //       console.log("Group creation failed with exception:", error);
  //     }
  //   );
  // }

  // startCall(){
  //   var sessionID = "SESSION_ID";

  //   CometChat.startCall(
  //   sessionID,
  //   document.getElementById("callScreen"),
  //     new CometChat.OngoingCallListener({
  //     onUserJoined: user => {
  //     /* Notification received here if another user joins the call. */
  //     console.log("User joined call:", user);
  //     /* this method can be use to display message or perform any actions if someone joining the call */
  //     },
  //     onUserLeft: user => {
  //     /* Notification received here if another user left the call. */
  //     console.log("User left call:", user);
  //     /* this method can be use to display message or perform any actions if someone leaving the call */
  //     },
  //     onCallEnded: call => {
  //     /* Notification received here if current ongoing call is ended. */
  //     console.log("Call ended:", call);
  //     /* hiding/closing the call screen can be done here. */
  //     }
  //   })
  //   );
  // }

}
