import { Injectable } from '@angular/core';
import { PlantModel } from './tab1/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  plants: PlantModel[] = [
    {
      id: 'p1',
      label: 'Kurt',
      imageUrl: '../../assets/plant.jpg' 
      
    
    },
    {
    id:'p2',
    label: 'Dman',
    imageUrl: '../../assets/plant.jpg' 
    }
    ]
  constructor() { }

  getAllPlants(){
    return [...this.plants];
  }
  getPlant(plantId: string){
    return{
      ...this.plants.find(plant => {
        return plant.id === plantId;
      })
    }
  }
}
