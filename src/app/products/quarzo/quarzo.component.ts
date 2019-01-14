import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';

@Component({
  selector: 'app-product',
  templateUrl: './quarzo.component.html',
  styleUrls: ['./quarzo.component.scss']
})
export class QuarzoComponent implements OnInit {

  product: any;
  models: Array<any>;
  isExpanded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
  }

  // routeTo(model) {
  //   this.router.navigate([`/productos/${this.id}/${model}`]);
  // }

}
