import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PlantsService } from '../plants.service';
import { PlantModel } from '../tab1/plant.model';

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
slides: Array<Object>= [
  {bild: "../../assets/plant.jpg", events: ["01.02."], icon: ["leaf-outline"] },
  {bild: "../../assets/plant.jpg", events: ["14.02.","20.02","test", "test","test"],icon: ["leaf-outline","logo-bitbucket"]}
]
ausgewahlt: number
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
  info(){
    alert("hier steht die info")
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
  addevent(){
  this.input=!this.input
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
    let inputElement= <HTMLInputElement>document.getElementById("event");
    let datum= <HTMLInputElement>document.getElementById("datum");
    this.loadedPlant.events.push(inputElement.value);
    this.loadedPlant.eventicon.push(this.icons[this.ausgewahlt]);
    this.loadedPlant.eventdate.push(datum.value);

    this.dbService.update('plants', {
    ...this.loadedPlant,
    
  })
  .subscribe((storeData) => {
    console.log('storeData: ', storeData);
  });
  this.input=!this.input

  }


}
