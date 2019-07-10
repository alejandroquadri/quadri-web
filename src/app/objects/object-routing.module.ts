import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjectMenuComponent } from './object-menu/object-menu.component';
import { ObjectComponent } from './object/object.component';

const routes: Routes = [
  {
    path: '',
    component: ObjectMenuComponent
  },
  {
    path: ':col/:prod',
    component: ObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectRoutingModule { }
