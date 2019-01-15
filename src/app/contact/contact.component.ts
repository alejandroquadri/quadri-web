import { Component, OnInit, Renderer, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { faMapMarker, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from './../shared/services/contact.service';
import { SeoService, StaticService } from '../shared';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('in', [
      state('hide', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('show',   style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('hide => show', animate('1000ms')),
      transition('show => hide', animate('1000ms'))
    ])
  ]
})
export class ContactComponent implements OnInit {

  myForm: FormGroup;
  showMap: boolean;
  thanks = 'hide';

  title = 'My first AGM project';
  lat = -34.606176;
  lng = -58.424542;

  public map = faMapMarker;
  public envelope = faEnvelope;
  public telephone = faPhone;

  constructor(
    private contactData: ContactService,
    private fb: FormBuilder,
    private renderer: Renderer,
    private seoService: SeoService,
    private staticService: StaticService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // esto es porque el componente de mapa usa la window y al renderizar para servidor
    // tira un error
    if (isPlatformBrowser(this.platformId)) {
      this.showMap = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.showMap = false;
    }
  }

  ngOnInit() {
    const metaTags = {
      title: 'Contacto | Quadri',
      description: 'Pisos y revestimientos únicos con terrazzo. Contactanos al +54 11 4861 0450',
      image: this.staticService.logo,
      slug: '/contacto',
    };

    this.seoService.generateTags(metaTags);
    this.buildForm();
  }

  buildForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      // telephone: [''],
      email: ['', Validators.required],
      query: ['', Validators.required],
    });
  }

  submit() {
    const query = this.myForm.value;
    // this.contactData.sendQuery(query)
    // .subscribe( () => console.log('email sent'));

    this.contactData.saveQuery(query)
    .then( () => {
      console.log('query saved')
      this.myForm.reset();
      this.thanks = 'show';
      setTimeout(() => {
        this.thanks = 'hide';
      }, 5000);
    });
  }

}
