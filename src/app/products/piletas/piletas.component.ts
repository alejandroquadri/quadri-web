import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../../shared';

@Component({
  selector: 'app-piletas',
  templateUrl: './piletas.component.html',
  styleUrls: ['./piletas.component.scss']
})
export class PiletasComponent implements OnInit {

  product: any;
  models: Array<any>;
  isExpanded = false;

  constructor(
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.product = this.staticData.data.products.losetas.models.piletas;

    const metaTags = {
      title: `Piletas | Quadri`,
      description: this.product.text,
      image: this.product.presentacion,
      slug: '/productos/losetas/piletas',
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();
  }

}
