import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdMenuComponent } from './prod-menu/prod-menu.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { QuarzoComponent } from './quarzo/quarzo.component';

const routes: Routes = [
  {
    path: '',
    component: ProdMenuComponent
  },
  {
    path: 'quarzo',
    component: QuarzoComponent
  },
  {
    path: 'mosaicos',
    component: ProductComponent
  },
  {
    path: ':id',
    component: ProductComponent
  },
  {
    path: ':id/:prod',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
