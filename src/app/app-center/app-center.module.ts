import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AppCenterRoutingModule } from './app-center-routing.module';
import { AppMenuComponent } from './app-menu/app-menu.component';

@NgModule({
  imports: [
    AppCenterRoutingModule,
    SharedModule
  ],
  declarations: [
    AppMenuComponent,
  ]
})
export class AppCenterModule { }
