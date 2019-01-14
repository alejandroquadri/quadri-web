import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prod-menu',
  templateUrl: './prod-menu.component.html',
  styleUrls: ['./prod-menu.component.scss']
})
export class ProdMenuComponent implements OnInit {

  products: any;
  productsArray: Array<any>;
  ambients: any;
  featured: any;

  spinner = faSpinner;

  constructor(
    private router: Router,
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.products = this.staticData.data.products.collections;
    // this.productsArray = Object.keys(this.products);
    this.featured = this.staticData.data.products.featured;

    this.ambients = this.staticData.data.ambients;

    const metaTags = {
      title: 'Nuestros productos | Quadri',
      description: 'Conoce todas nuestras lineas de productos',
      image: this.featured,
      slug: '/productos',
    };

    this.seoService.generateTags(metaTags);
  }

  routeTo(prod) {
    this.router.navigate([`/productos/${prod}`]);
  }

  loaded() {
    console.log('loaded');
  }

}
