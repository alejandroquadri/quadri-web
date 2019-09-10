import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';

@Component({
  selector: 'app-product',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  product: any;
  models: Array<any>;
  isExpanded = false;

  constructor(
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.product = this.staticData.data.products.collections.quarzo;
    if (this.product.models) {
      this.models = Object.keys(this.product.models);
    }

    const metaTags = {
      title: `${this.product.name} | Quadri`,
      description: this.product.text,
      image: this.product.presentacion,
      slug: '/productos/quarzo',
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();
  }

}
