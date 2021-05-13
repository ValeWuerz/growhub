import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PlantsService } from '../plants.service';
import { PlantModel } from '../tab1/plant.model';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-plantinfo',
  templateUrl: './plantinfo.page.html',
  styleUrls: ['./plantinfo.page.scss'],
})
export class PlantinfoPage implements OnInit {
  icons: Array<string>=["leaf-outline","logo-bitbucket", "flower-outline" ]
loadedPlant: PlantModel = {};
rendered: false| true
input: false|true=false
eventclicked: false|true=false
wisch: number
slides: Array<Object>= [
  {bild: "../../assets/plant.jpg", events: ["01.02."], icon: ["leaf-outline"] },
  {bild: "../../assets/plant.jpg", events: ["14.02.","20.02","test", "test","test"],icon: ["leaf-outline","logo-bitbucket"]}
]
ausgewahlt: number
elected: number
events: Array<String>=["14.02.","","","",""]
slideOpts = {
  initialSlide: 2,
  speed: 400
};
  constructor(private dbService: NgxIndexedDBService, private activatedRoute: ActivatedRoute, private plantservice: PlantsService) {
   }

  ngOnInit() {
  
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('plantId')){
        //redirect
        return;
      }
      const plantId = paramMap.get('plantId');
      console.log(plantId)
      this.dbService.getByKey('plants', Number(plantId)).subscribe((plant) => {
        this.loadedPlant= plant;
        console.log(plant)
        console.log(plantId)
      })
      
    });
  }
 showevent(i){
   
  this.eventclicked=!this.eventclicked;
  this.elected=i;
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
