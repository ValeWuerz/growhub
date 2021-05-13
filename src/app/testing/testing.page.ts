import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
icons: Array<string>=["testen","nochmal","f","de","sd"]
arr: Array<Array<string>>=[[],[],[],[],[],[]]
counter: number=0;
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
 adden(){
   this.counter=this.counter+1;
   this.arr[1].push(this.counter.toString())
   console.log(this.arr)
 }
ausgabe(i){
  this.icons.forEach(element => {
   let alle= this.icons.indexOf(element)
   document.getElementById(String(alle)).style.borderColor=""
   document.getElementById(String(alle)).style.borderStyle="none"
   document.getElementById(String(alle)).style.borderRadius="100%"
    
  });
  document.getElementById(i).style.borderColor="red"
  document.getElementById(i).style.borderStyle="solid"
  document.getElementById(i).style.borderRadius="100%"
 
  
}
}
