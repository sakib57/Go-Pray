import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasbih',
  templateUrl: './tasbih.page.html',
  styleUrls: ['./tasbih.page.scss'],
})
export class TasbihPage implements OnInit {

  counter = 0
  total = 0
  round = 33
  temp = null
  constructor(
  ) {
  }

  ngOnInit() {
  }

  addCount(){
    this.counter += 1
    this.temp += 1
    this.total += 1
    if(this.counter > this.round-1){
      this.counter = 0
      
    }
    if(this.temp>98){
      this.temp = 0
    }
  }

  reset(){
    this.counter = 0
    this.total = 0
    this.temp = 0
  }

  changeRound(){
    if(this.round == 33){
      this.round = 99
      console.log(this.temp)
      if(this.temp>32){
        this.counter =this.temp
      }
    }else if(this.round == 99){
      this.round = 33
      if(this.temp>32 && this.temp <66){
        this.counter = this.counter - 33
      }else if(this.temp>65 && this.temp <99){
        this.counter = this.counter - 66
      }
    }
  }

}
