import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EnlacesUnoComponent } from './enlaces-uno/enlaces-uno.component';
import { EnlacesDosComponent } from './enlaces-dos/enlaces-dos.component';
import { EnlacesTresComponent } from './enlaces-tres/enlaces-tres.component';

const routes: Routes = [
  {
    path: 'enlaces-quadri-1.html',
    component: EnlacesUnoComponent
  },
  {
    path: 'enlaces-quadri-2.html',
    component: EnlacesDosComponent
  },
  {
    path: 'enlaces-quadri-3.html',
    component: EnlacesTresComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EnlacesUnoComponent,
    EnlacesDosComponent,
    EnlacesTresComponent
  ]
})
export class EnlacesModule { }
