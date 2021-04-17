import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
})
export class PlantComponent implements OnInit {
  plantname="Frank"+"(Gurkenpflanze)";
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };


  constructor() {

   }

  ngOnInit() {}

}