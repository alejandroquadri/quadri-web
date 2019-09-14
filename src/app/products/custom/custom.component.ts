import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  product: any;
  imgs: any;
  models: Array<any>;
  isExpanded = false;
  id: any;

  constructor(
    private staticData: StaticService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    const path = this.router.url.replace('/productos/', '');
    this.product = this.staticData.data.products[path];
    this.imgs = this.staticData.data.imgs;

    const metaTags = {
      title: `${this.product.title} | Quadri`,
      description: this.product.subText,
      image: this.product.presentacion,
      slug: '/productos/quarzo',
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();
  }

}
