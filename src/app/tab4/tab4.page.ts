import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
//import {AnimationBuilder} from '@angular/animations';
//declare var Accelerometer


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate({{ angle }}deg)' }), {params: {angle: 0}}),
      state('rotated', style({ transform: 'rotate({{ angle }}deg)' }), {params: {angle: 0}}),
      transition('* => *', animate('2000ms ease-in'))
    ])
  ]
})
export class Tab4Page implements OnInit {

  //@ViewChild("imgg") imageContainerElement: ElementRef;
  Myangle = 0
  OldAngle = 0
  compas = 0
  rsstate = 'default';
  flag = 0
  degtorad = Math.PI / 180; // Degree-to-Radian conversion

  constructor(
    public plt: Platform,
    public screenOrientation: ScreenOrientation
  ) {
    
   }

  

  ngOnInit() {
    console.log(this.screenOrientation.type);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.flag = 1
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      let that = this;
      (<any>window).addEventListener('deviceorientation', function(e) {
        var absolute = e.absolute;
        var alpha    = e.alpha;
        var beta     = e.beta;
        var gamma    = e.gamma;

        
        that.Myangle = Math.ceil(alpha)
        var tt = Math.ceil(that.compassHeading(alpha,beta,gamma))
        that.compas = tt
        
        console.log(that.flag)

        // if(this.flag == 1){
        //   this.OldAngle = this.Myangle
        //   if ( this.rsstate == 'rotated') {
        //     this.rsstate = 'default'
        //   } else { 
        //     this.rsstate = 'rotated'
        //   }
        // }

        // this.rsstate = 'rotated'

        // console.log(this.rsstate)

        if(this.flag == 1){
          this.flag = 0
        }
        
        
        
        

        //this.state = 'default'
        //this.state = 'rotated'

        // console.log('absolute',absolute)
        // console.log('alpha',alpha)
        // console.log('beta',beta)
        // console.log('gamma',gamma)

        // let animationFactory = this.animationBuilder.build([
        //   style('*'),
        //   animate('500ms', style({transform: 'rotate(' + this.angle + 'deg)'}))
        // ]);
        // animationFactory.create(this.imgg.nativeElement).play();
      
      });
      console.log('ffff',this.rsstate)
    
    });
    
  }
  ionViewDidEnter(){
    //this.rsstate = 'rotated'
  }
  // animEnd(event){
  //   if(this.OldAngle - this.Myangle > 5){
  //     this.flag = 1
  //   }
  //   if(this.Myangle - this.OldAngle > 5){
  //     this.flag = 1
  //   }
      
  // }

  

compassHeading( alpha, beta, gamma ) {

  var _x = beta  ? beta  * this.degtorad : 0; // beta value
  var _y = gamma ? gamma * this.degtorad : 0; // gamma value
  var _z = alpha ? alpha * this.degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  // Calculate Vx and Vy components
  var Vx = - cZ * sY - sZ * sX * cY;
  var Vy = - sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan( Vx / Vy );

  // Convert compass heading to use whole unit circle
  if( Vy < 0 ) {
    compassHeading += Math.PI;
  } else if( Vx < 0 ) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)

}

}
