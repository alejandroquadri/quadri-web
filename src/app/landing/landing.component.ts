import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { StaticService, SeoService } from '../shared';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  carrousel = true;
  data: any;
  images: any;
  doc: any;

  carouselInner: any;
  carouselItems: any;
  active: any;

  slidesData: any;
  slidesArray: Array<any>;

  // @ViewChild('slide1') slide1;
  @ViewChild('terrazzo') terrazzo: ElementRef;

  constructor(
    private staticData: StaticService,
    public router: Router,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: any,
  ) {
    // this.doc = document;
    this.data = this.staticData.data.landing;
    this.images = this.staticData.data.projectImgs;

    this.slidesData = this.staticData.data.landing.slides;
    this.slidesArray = Object.keys(this.slidesData);
  }

  ngOnInit() {

    const metaTags = {
      title: 'Pisos y revestimientos de terrazzo | Quadri',
      // tslint:disable-next-line:max-line-length
      description: 'En Quadri diseñamos y fabricamos desde 1861 pisos y revestimientos únicos con terrazzo para las mas variadas aplicaciones de diseño y arquitectura.',
      image: this.slidesData[0].img,
      slug: '',
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();

    // !! el codigo de abajo sirve para cambiar el css para que el carousel quede fullscreen
    if (this.carrousel) {
      setTimeout( () => {
        this.carouselInner = this.document.getElementsByClassName('carousel-inner');
        this.carouselInner[0].style.cssText = `
            height: 100%;
        `;
        this.changeCSS();
      }, 50);
    }
  }

  // esta funcion es para que el carousel quede full screen
  cambio(event) {
    // console.log('slide', event, this.slide1);
    this.changeCSS();
  }

  // esta funcion es para que el carousel quede full screen
  changeCSS() {
    setTimeout( () => {
      this.carouselItems = this.document.querySelectorAll('.carousel-item');
      for (let i = 0; i < this.carouselItems.length; i++) {
        this.carouselItems[i].style.display = 'none';
      }
      this.active = this.document.querySelectorAll('.carousel-item.active');

      this.active[0].style.height = '100%';
      this.active[0].style.display = 'flex';
    }, 50);
  }

  toProducts() {
    this.router.navigate(['/productos']);
  }

  more() {
    this.terrazzo.nativeElement.scrollIntoView({ block: 'start', inline: 'nearest',  behavior: 'smooth' });
  }

  toQueo() {
    this.document.location.href = 'https://queo.com.ar';
  }

  terciary(ter) {
    console.log(ter);
  }

}
