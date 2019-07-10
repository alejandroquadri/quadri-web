import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { ObjectMenuComponent } from './object-menu/object-menu.component';
import { ObjectComponent } from './object/object.component';
import { SharedModule, BuyModalComponent } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    ObjectRoutingModule,
    SharedModule
  ],
  entryComponents: [
    BuyModalComponent,
  ],
  declarations: [
    ObjectComponent,
    ObjectMenuComponent,
  ]
})
export class ObjectModule { }
