import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../plants.service';
import { PlantModel } from './plant.model';
import { NgxIndexedDBService} from 'ngx-indexed-db';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  creating: true | false;
plants: PlantModel[];
pflanzenname: string="Pflanzenname"
pflanzennamen: Array<string>=[]
file: File
  constructor(private plantservice: PlantsService, private dbService: NgxIndexedDBService) {
    this.creating=false;
  }

  ngOnInit(){

this.dbService.getAll('plants').subscribe((plant) => {
  this.plants=plant;
  console.log(this.plants)
})

    
    
    /* this.plantservice.getAllPlants(); */
  /*   this.dbService.getByKey('people', 57).subscribe((people) =>{
      console.log(people['email'])
      const preview =<HTMLImageElement> document.getElementById('bilder');
  preview.src=URL.createObjectURL(people['email'])
    })
this.plants= this.plantservice.plants;

this.dbService.add('plants', {
  name: 'Priscilla',
  bild: "test",

})
.subscribe((key) => {
  console.log('key: ', key);
});
this.dbService.getByKey('people', 50).subscribe((people) =>{
  console.log(people['email'])
})

const fileInput = <HTMLInputElement>document.getElementById('input');
fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
  console.log(selectedFile);
  this.dbService.add('plants', {
    name: 'Priscilla',
    email: selectedFile
  })
  const preview =<HTMLImageElement> document.getElementById('bilder');
  preview.src=URL.createObjectURL(selectedFile)
} */
  }
  
  









  plantadd(){
    //Blendet form ein bzw. aus
 this.creating=!this.creating;
 //falls die Form verändert wurde werden die eingetragenen werte (Bild und Name) an die Datenbank gesendet
 if(this.pflanzenname!="Pflanzenname"){

  const file= <HTMLInputElement>document.getElementById('input');
  let mySrc;
  const reader = new FileReader();
  reader.readAsDataURL(file.files[0]); 
  reader.onloadend =  () =>  {
     // result includes identifier 'data:image/png;base64,' plus the base64 data
     mySrc = reader.result;    
     var test= new Promise<void>((resolve, reject) => {
       this.plantservice.addplant(this.pflanzenname,  mySrc);
     resolve( this.normalise())
     }) 


  }  

 

  this.dbService.getAll('plants').subscribe((plant) => {
      console.log(plant)

      plant.forEach(element => this.pflanzennamen.push(element['name']));
      console.log(this.pflanzennamen)
    });
       

 }
  }
  
  
   normalise(){
    
      this.pflanzenname="Pflanzenname"
      setTimeout(() => {
        this.dbService.getAll('plants').subscribe((plant) => {
          this.plants=plant;
          console.log(this.plants)
        })
      }, 1);
 
    }
  
  
}
