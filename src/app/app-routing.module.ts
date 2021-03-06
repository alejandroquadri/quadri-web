import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'menu-productos',
    loadChildren: './app-center/app-center.module#AppCenterModule'
  },
  {
    path: 'productos',
    loadChildren: './app-center/app-center.module#AppCenterModule'
  },
  {
    path: 'productos',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'objetos',
    loadChildren: './objects/object.module#ObjectModule'
  },
  {
    path: 'enlaces',
    loadChildren: './enlaces/enlaces.module#EnlacesModule'
  },
  { path: 'inspiracion', component: ProjectsComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'la-empresa', component: AboutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
