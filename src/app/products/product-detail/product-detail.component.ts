import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  prod: any;
  model: any;
  modelData: any;

  constructor(
    private route: ActivatedRoute,
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.prod = this.route.snapshot.paramMap.getAll('id')[0];
    this.model = this.route.snapshot.paramMap.getAll('prod')[0];
    const prod = this.staticData.data.products[this.prod];
    this.modelData = prod.models[this.model];

    const metaTags = {
      title: `${ this.modelData.name } | Terrazzo Quadri`,
      description: this.modelData.text,
      image: this.modelData.presentacion,
      slug: `/productos/${this.prod}/${this.modelData}`,
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();
  }

}
