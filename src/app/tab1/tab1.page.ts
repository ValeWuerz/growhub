import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../plants.service';
import { PlantModel } from './plant.model';
import {NgxIndexedDBService} from 'ngx-indexed-db';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
plants: PlantModel[];
  constructor(private plantservice: PlantsService, private dbService: NgxIndexedDBService) {}

  ngOnInit(){
    this.dbService.getByKey('people', 57).subscribe((people) =>{
      console.log(people['email'])
      const preview =<HTMLImageElement> document.getElementById('bilder');
  preview.src=URL.createObjectURL(people['email'])
    })
this.plants= this.plantservice.plants;

this.dbService
.add('people', {
  name: 'Bruce Wayne',
  email: 'bruce@wayne.com',

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
  this.dbService.add('people', {
    name: 'bild',
    email: selectedFile
  })
  const preview =<HTMLImageElement> document.getElementById('bilder');
  preview.src=URL.createObjectURL(selectedFile)
}
  }
  
  
  plantadd(){
    this.dbService.getByKey('people', 1).subscribe((people) => {
      console.log(people);
    });

    alert("adden")
  }
  
}
