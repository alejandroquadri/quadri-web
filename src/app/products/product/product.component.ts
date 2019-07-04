import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: any;
  product: any;
  models: Array<any>;

  spinner = faSpinner;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.getAll('id')[0].toLowerCase();
    this.product = this.staticData.data.products.collections[this.id];

    if (this.product.models) {
      this.models = Object.keys(this.product.models);
    }

    const metaTags = {
      title: `${this.product.name} | Terrazzo Quadri`,
      description: this.product.text,
      image: this.product.presentacion,
      slug: `/productos/${this.id}`,
    };
    this.seoService.generateTags(metaTags);

  }

  routeTo(model) {
    this.router.navigate([`/productos/${this.id}/${model}`]);
  }

}
