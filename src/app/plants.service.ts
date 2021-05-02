import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { PlantModel } from './tab1/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
allplants: Observable<PlantModel>;
  plants: PlantModel[] = [    ];
  loaded: Object={}
  constructor(private dbService: NgxIndexedDBService) { }
addplant(pflanzenname, bild){
  this.dbService.add('plants',{
name: pflanzenname,
bild: bild

  })
 

}
/*   getAllPlants(){

    this.dbService.getByKey('plants', 57).subscribe((plants) =>{
      console.log(plants)
    })
    return this.allplants;
  }
   */
 
}
