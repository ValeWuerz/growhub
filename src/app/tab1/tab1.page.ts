import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../plants.service';
import { PlantModel } from './plant.model';
import { NgxIndexedDBService} from 'ngx-indexed-db';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  creating: true | false;
plants: PlantModel[];
pflanzenname: string="Pflanzenname"
pflanzennamen: Array<string>
file: File
  constructor(private plantservice: PlantsService, private dbService: NgxIndexedDBService) {
    this.creating=false;
  }

  ngOnInit(){

this.dbService.getAll('people').subscribe((people) => {
  this.plants=people;
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
  this.plantservice.addplant(this.pflanzenname,  file.files[0]);
  this.pflanzenname="Pflanzenname"
 
    alert("adden")
    this.dbService.getAll('people').subscribe((people) => {
      people.forEach(element => this.pflanzennamen.push(element['name']));
      console.log(this.pflanzennamen)
    });
 }
  }
  
}
