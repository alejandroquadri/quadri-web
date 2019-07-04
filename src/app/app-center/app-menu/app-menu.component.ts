import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { StaticService, SeoService } from '../../shared';
import { faSpinner, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  data: any;
  appMenu: any;

  public spinner = faSpinner;
  public externalLinkIcon = faExternalLinkSquareAlt;
  public queoLogo = './assets/icons/Queo-quadri-dark-tp.png';


  // @ViewChild('pisosInt') pisosInt: ElementRef; lo dejo para tener de referencia como intervenir un elemento
  @ViewChild('pisosExt') pisosExt: ElementRef;
  @ViewChild('paredInt') paredInt: ElementRef;
  @ViewChild('paredExt') paredExt: ElementRef;
  @ViewChild('mesas') mesas: ElementRef;

  constructor(
    public staticData: StaticService,
    private router: Router,
    // private renderer: Renderer2,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.data = this.staticData.data;
    this.appMenu = this.staticData.data.appMenu;
  }

  ngOnInit() {
    const metaTags = {
      title: 'Aplicaciones de nuestros productos | Quadri',
      // tslint:disable-next-line:max-line-length
      description: 'Conoce todas las posibles aplicaciones de nuestros productos en tus proyectos',
      image: this.appMenu.pisosExt.img,
      slug: '/aplicaciones',
    };

    this.seoService.generateTags(metaTags);
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  toQueo() {
    this.document.location.href = 'https://queo.com.ar';
  }

  // lo dejo de referencia para saber como intervenir un elemento
  // mouseIn(event, app: string) {
  //   const el = this.wichApp(app);
  //   this.renderer.addClass(el.nativeElement, 'customDark');
  // }
  // mouseOut(event, app: string) {
  //   const el = this.wichApp(app);
  //   this.renderer.removeClass(el.nativeElement, 'customDark');
  // }

}
