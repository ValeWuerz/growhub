import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantinfoPage } from './plantinfo.page';

const routes: Routes = [
  {
    path: '',
    component: PlantinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantinfoPageRoutingModule {}
