import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { StaticService } from '../../shared';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  data: any;
  appMenu: any;

  spinner = faSpinner;

  // @ViewChild('pisosInt') pisosInt: ElementRef; lo dejo para tener de referencia como intervenir un elemento
  @ViewChild('pisosExt') pisosExt: ElementRef;
  @ViewChild('paredInt') paredInt: ElementRef;
  @ViewChild('paredExt') paredExt: ElementRef;
  @ViewChild('mesas') mesas: ElementRef;

  constructor(
    public staticData: StaticService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.data = this.staticData.data;
    this.appMenu = this.staticData.data.appMenu;
  }

  ngOnInit() {
  }

  goTo(path: string) {
    this.router.navigate([path]);
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

  // wichApp(app: string) {
  //   let result;
  //   switch (app) {
  //     case 'pisosInt':
  //       result = this.pisosInt;
  //       break;

  //     case 'pisosExt':
  //       result = this.pisosExt;
  //       break;

  //     case 'paredInt':
  //       result = this.paredInt;
  //       break;

  //     case 'paredExt':
  //       result = this.paredExt;
  //       break;

  //     case 'mesas':
  //       result = this.mesas;
  //       break;
  //   }
  //   return result;
  // }

}
