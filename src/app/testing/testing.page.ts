import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import interact from 'interactjs'

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
    this.dragging();

  }
  
  dragging(){
    const position = { x: 0, y: 0 }
  
   interact('.draggable').draggable( 
     {
      
      listeners: {
        
        start (event)  {
          console.log(event.type, event.target)
          
        },
        move (event)  {
          position.x += event.dx
          position.y += event.dy
  
    
          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
            
        },
      }
    })
  
  }
  position(){
   
  }
 adden(){
   alert("test")
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
