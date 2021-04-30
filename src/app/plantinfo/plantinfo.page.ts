import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantsService } from '../plants.service';
import { PlantModel } from '../tab1/plant.model';

@Component({
  selector: 'app-plantinfo',
  templateUrl: './plantinfo.page.html',
  styleUrls: ['./plantinfo.page.scss'],
})
export class PlantinfoPage implements OnInit {
loadedPlant: PlantModel;
  constructor(private activatedRoute: ActivatedRoute, private plantservice: PlantsService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('plantId')){
        //redirect
        return;
      }
      const plantId = paramMap.get('plantId');
      this.loadedPlant= this.plantservice.getPlant(plantId);
    });
  }

}
