import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProdMenuComponent } from './prod-menu/prod-menu.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { QuarzoComponent } from './quarzo/quarzo.component';

import { SharedModule } from '../shared';
import { PiletasComponent } from './piletas/piletas.component';
import { CustomComponent } from './custom/custom.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [
    ProdMenuComponent,
    ProductComponent,
    QuarzoComponent,
    ProductDetailComponent,
    PiletasComponent,
    CustomComponent
  ]
})
export class ProductsModule { }
