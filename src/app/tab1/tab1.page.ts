import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../plants.service';
import { PlantModel } from './plant.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
plants: PlantModel[];
  constructor(private plantservice: PlantsService) {}

  ngOnInit(){
this.plants= this.plantservice.plants;
  }
  plantadd(){
    alert("adden")
  }
}
