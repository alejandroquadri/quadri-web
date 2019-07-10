import { Component, OnInit } from '@angular/core';
import { StaticService, SeoService } from '../shared';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  data: any;

  constructor(
    private staticData: StaticService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.data = this.staticData.data.about;
    const metaTags = {
      title: 'Nosotros | Quadri',
      // tslint:disable-next-line:max-line-length
      description: 'En Quadri diseñamos y fabricamos desde 1861 pisos y revestimientos únicos con terrazzo para las mas variadas aplicaciones de diseño y arquitectura. Conoce mas de la historia del terrazzo',
      image: this.data.featured,
      slug: '/nosotros',
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();
  }

}
