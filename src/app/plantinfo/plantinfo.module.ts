import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantinfoPageRoutingModule } from './plantinfo-routing.module';

import { PlantinfoPage } from './plantinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantinfoPageRoutingModule
  ],
  declarations: [PlantinfoPage]
})
export class PlantinfoPageModule {}
