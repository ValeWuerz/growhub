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
loadedPlant: PlantModel = {};
rendered: false| true
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

}
