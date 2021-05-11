import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
icons: Array<string>=["testen","nochmal","f","de","sd"]
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
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
