import { Component, Injectable, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PlantsService } from '../plants.service';
import { PlantModel } from '../tab1/plant.model';
import { PopoverController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { observable } from 'rxjs';
import interact from 'interactjs';
@Component({
  selector: 'app-plantinfo',
  templateUrl: './plantinfo.page.html',
  styleUrls: ['./plantinfo.page.scss'],
})

export class PlantinfoPage implements OnInit {
  @ViewChild('slides', { static: false }) ionSlides: IonSlides;
  icons: Array<string>=["leaf-outline","logo-bitbucket", "flower-outline" ]
loadedPlant: PlantModel = {};
rendered: false| true
input: false|true=false
eventclicked: false|true=false
slideadd: false|true=true
wisch: number
showsavepic: false |true=false;
slidess: Array<Object>= [
  {bild: "../../assets/plant.jpg", events: ["01.02."], icon: ["leaf-outline"] },
  {bild: "../../assets/plant.jpg", events: ["14.02.","20.02","test", "test","test"],icon: ["leaf-outline","logo-bitbucket"]}
]
ausgewahlt: number
elected: number
events: Array<String>=["14.02.","","","",""]
slideOpts = {
  initialSlide: 0,
  speed: 400
};
  constructor(private dbService: NgxIndexedDBService, private activatedRoute: ActivatedRoute, private plantservice: PlantsService) {
  }

  ngOnInit() {
    this.dragging();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('plantId')){
        //redirect
        return;
      }
      const plantId = paramMap.get('plantId');
      console.log(plantId)
      this.dbService.getByKey('plants', Number(plantId)).subscribe((plant) => {
        this.loadedPlant= plant;
        this.ionSlides.slideTo(this.loadedPlant.bilder.length-1, 300)
         console.log(plant)
        console.log(plantId)
      })
      
    });

  }
   dragging(){

    const position = { x: 0, y: 0 }
  
   interact('.draggable').draggable(      {
      
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
    
  interact.on('dragend', (event)=> {
   this.position();
   
  })
  }
  addslide(){
    this.showsavepic=true;
  }
  fileinput(){
    document.getElementById('file').click();


  }
  position(){
    let element= document.getElementById('tomate')
    let positiony= window.scrollY + element.getBoundingClientRect().top
    let positionx= window.scrollX + element.getBoundingClientRect().left
    let backx= positionx - 10;
    let backy= positiony - 165;
element.animate([
  // keyframes
  { transform: `translateY(0px)`,  },
  /* { transform: `translateX(-10px)` },
  { transform: `translateY(${positiony}px)`,  },
  { transform: `translateY(-10px)`,  }, */


], {
  // timing options
  duration: 700,
  
}).finished.then(function(value) {
/*  location.reload(); */
  // fulfillment
/*   element.style.transform="none" */
 }, function(reason) {
 // rejection
});
/* alert('Element is ' + positionx + '/' + positiony + ' vertical pixels from <body>'); */
  }
  delslide(s){
    console.log(s)
    this.loadedPlant.bilder.splice(s, 1)
    console.log(this.loadedPlant.bilder)
    this.loadedPlant.events.splice(s,1);
    this.loadedPlant.events.push([]);
    this.loadedPlant.eventicon.splice(s,1);
    this.loadedPlant.eventicon.push([]);
    this.loadedPlant.eventdate.splice(s,1);
    this.loadedPlant.eventdate.push([]);
    this.dbService.update('plants', {
      ...this.loadedPlant,
      
      
    })

  }
  savepic(){
this.showsavepic=false;

    const file= <HTMLInputElement>document.getElementById('file');
    let mySrc;
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]); 
    reader.onloadend = () =>   {
       // result includes identifier 'data:image/png;base64,' plus the base64 data
       mySrc = reader.result;    

       this.loadedPlant.bilder.push(mySrc)
       this.dbService.update('plants', {
        ...this.loadedPlant,
        
        
      }).subscribe((key) => {
        this.ionSlides.slideTo(this.loadedPlant.bilder.length-1)

      });
  
  
    }  
  }
 showevent(s,i){
   this.elected=i;
  this.wisch=s
  this.eventclicked=!this.eventclicked;
  

 }
 delevent(){
  this.loadedPlant.events[this.wisch].splice(this.elected,1);
  this.loadedPlant.eventicon[this.wisch].splice(this.elected,1);
  this.loadedPlant.eventdate[this.wisch].splice(this.elected,1);
  this.dbService.update('plants', {
    ...this.loadedPlant,
    
  })
  this.eventclicked=!this.eventclicked;

 }
  
  
  markiere(i){
    this.icons.forEach(element => {
      let alle= this.icons.indexOf(element)
      document.getElementById(String(alle)).style.borderColor=""
      document.getElementById(String(alle)).style.borderStyle="none"
      document.getElementById(String(alle)).style.borderRadius="100%"
       
     });
     document.getElementById(i).style.borderColor="red"
     document.getElementById(i).style.borderStyle="solid"
     document.getElementById(i).style.borderRadius="100%"
this.ausgewahlt=i;
    
  }
  addevent(s){
  this.input=!this.input
  this.wisch=s
  console.log(this.wisch)
  /*   this.dbService
  .update('plants', {
    ...this.loadedPlant,
    test: "heyyo"
  })
  .subscribe((storeData) => {
    console.log('storeData: ', storeData);
  }); */
  }
  eventerstellen(i){
    console.log(this.wisch)

    console.log(this.loadedPlant.events[Number(this.wisch)])
    let inputElement= <HTMLInputElement>document.getElementById("event");
    let datum= <HTMLInputElement>document.getElementById("datum");
    console.log(this.loadedPlant.events[this.wisch])
    this.loadedPlant.events[this.wisch].push(inputElement.value);
    this.loadedPlant.eventicon[this.wisch].push(this.icons[this.ausgewahlt]);
    this.loadedPlant.eventdate[this.wisch].push(datum.value);

    this.dbService.update('plants', {
    ...this.loadedPlant,
    
  })
  .subscribe((storeData) => {
    console.log('storeData: ', storeData);
  });
  this.input=!this.input

  }


}
