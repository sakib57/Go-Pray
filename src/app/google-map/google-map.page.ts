import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Events } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

//declare var google;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})
export class GoogleMapPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;

  name : string
  lat: number
  lng: number
  constructor(
    public events: Events,
    public route: ActivatedRoute,
    public geolocation: Geolocation, 
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.lat = +this.route.snapshot.paramMap.get('lat');
    this.lng = +this.route.snapshot.paramMap.get('lng');
    
    
    console.log(this.name);
    console.log(this.lat);
    console.log(this.lng);
  


    this.loadMap();
    //this.startNavigating()
  }

  // ionViewWillEnter(){
  //   this.events.subscribe('map_name',(name)=>{
  //     console.log('map_name',name);
  //   })
  // }

  loadMap() {

    let map = GoogleMaps.create( 'map' );
  
    map.one( GoogleMapsEvent.MAP_READY ).then( ( data: any ) => {


     
      let coordinates: LatLng = new LatLng( this.lat, this.lng );
  
      let position = {
        target: coordinates,
        zoom: 14,
        //mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  
      map.animateCamera( position );
  
      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: "assets/images/marker.png",
        title: this.name
      };
      const marker = map.addMarker( markerOptions )
      .then( ( marker: Marker ) => {
        marker.showInfoWindow();
      });



      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        let coordinates_me: LatLng = new LatLng( resp.coords.latitude, resp.coords.longitude );
        let markerOptions_me: MarkerOptions = {
          position: coordinates_me,
          icon: {
            url: "https://optest.therssoftware.com/prayer_app/human.png",
            size: {
              width: 40,
              height: 48
            }
          }
          //title: this.name
        };
        const marker_me = map.addMarker( markerOptions_me )
        .then( ( marker: Marker ) => {
          marker.showInfoWindow();
        });
       }).catch((error) => {
         console.log('Error getting location', error);
       });

    })
  }
//   startNavigating(){

//     let directionsService = new google.maps.DirectionsService;
//     let directionsDisplay = new google.maps.DirectionsRenderer;

//     directionsDisplay.setMap(this.map);
//     directionsDisplay.setPanel(this.directionsPanel.nativeElement);

//     directionsService.route({
//         origin: 'adelaide',
//         destination: 'adelaide oval',
//         travelMode: google.maps.TravelMode['DRIVING']
//     }, (res, status) => {

//         if(status == google.maps.DirectionsStatus.OK){
//             directionsDisplay.setDirections(res);
//         } else {
//             console.warn(status);
//         }

//     });

// }

}
