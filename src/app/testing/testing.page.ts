import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import interact from 'interactjs'
import { PhotoService } from '../services/photo.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import{AppModule} from '../app.module'
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from 'src/environments/environment';
import { Photo } from '../photo';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
  defineCustomElements(window);
@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
icons: Array<string>=["testen","nochmal","f","de","sd"]
arr: Array<Array<string>>=[[],[],[],[],[],[]]
counter: number=0;
photo: Photo[] = this.photoService.photos;
base: string

  constructor(public popoverController: PopoverController, public photoService: PhotoService) { }

  ngOnInit() {
    this.dragging();
  
    
  }
  
  addPhotoToGallery() {
    this.photoService.addNewToGallery("test").then( (value) => {
      this.show()
     }, function(reason) {
     // rejection
   });
    
  }

  show(){
    this.base=this.photoService.base
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
