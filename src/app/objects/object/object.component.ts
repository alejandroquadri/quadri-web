import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { StaticService, BuyModalComponent, SeoService } from '../../shared';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  doc: any;
  colKey: any;
  prodKey: any;
  product: any;
  currentFormat: any;
  currentColor: any;
  imgArray: Array<any>;
  spinner = faSpinner;

  @ViewChild('carousel') carousel;
  carouselInner: any;
  carouselItems: any;
  active: any;

  buyForm: FormGroup;
  colors: any;
  form$: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private staticData: StaticService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    @Inject(DOCUMENT) document
  ) {
    this.doc = document;
  }

  ngOnInit() {
    this.colKey = this.route.snapshot.paramMap.getAll('col');
    this.prodKey = this.route.snapshot.paramMap.getAll('prod');
    this.product = this.staticData.data.products.objects[this.colKey].products[this.prodKey];
    this.colors = this.staticData.data.colors;
    if (!this.product) {
      this.router.navigate(['/']);
    }
    this.currentFormat = this.product.format[0];
    this.currentColor = this.currentFormat.colors[0];
    this.imgArray =  this.product.format[0].colors[0].imgs;

    this.buildForm();
    this.setSEO();
  }

  setSEO() {
    const metaTags = {
      title: `${this.product.name} | Productos ${this.colKey} Quadri`,
      // tslint:disable-next-line:max-line-length
      description: this.product.text,
      image: this.product.bgImg,
      slug: `objetos/${this.colKey}/${this.prodKey}`,
    };

    this.seoService.generateTags(metaTags);
    this.seoService.createCanonicalURL();
  }

  buildForm() {
    this.buyForm = this.fb.group({
      format: [this.product.format[0], Validators.required],
      colorsCtrl: this.fb.array([]),
      qty: [ 1, Validators.required],
    });
    this.addSet(this.buyForm.value.format);
    this.seeFormChanges();
  }

  get colorsCtrl() {
    return this.buyForm.get('colorsCtrl') as FormArray;
  }

  addColorCtrl(color) {
    this.colorsCtrl.push(this.fb.group({
      color: [color, Validators.required],
    }));
  }

  clearColors() {
    while (this.colorsCtrl.value.length !== 0) {
      this.colorsCtrl.removeAt(0);
    }
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  addSet(format) {
    // console.log('formato elegido', format);
    if (format.set) {
      format.set.sizes.forEach( (size, index) => {
        this.addColorCtrl(format.colors[0]);
      });
      this.imgArray =  format.set.imgs;
    } else {
      this.addColorCtrl(format.colors[0]);
      this.imgArray =  format.colors[0].imgs;
    }
  }

  seeFormChanges() {
    this.buyForm.controls['format'].valueChanges.subscribe(val => {
      this.clearColors();
      this.addSet(val);
    });
  }

  add() {
    let qty = this.buyForm.controls['qty'].value;
    qty += 1;
    this.buyForm.patchValue({
      qty: qty
    });
  }

  sub() {
    let qty = this.buyForm.controls['qty'].value;
    qty -= 1;
    this.buyForm.patchValue({
      qty: qty
    });
  }

  buy() {
    const buyForm = this.buyForm.value;
    const sendForm = {
      product: this.product.name,
      desc: buyForm.format.buyDesc,
      price: buyForm.format.price,
      qty: buyForm.qty
    };
    if (buyForm.format.set) {
      const colors = [];
      buyForm.format.set.sizes.forEach( (size, index) => {
        const color = {
          size: size,
          color: buyForm.colorsCtrl[index].color.name
        };
        colors.push(color);
      });
      sendForm['color'] = colors;
      sendForm['set'] = true;
    } else {
      sendForm['color'] = buyForm.colorsCtrl[0].color.name;
      sendForm['set'] = false;
    }
    const modalRef = this.modalService.open(BuyModalComponent, {size: 'lg'});
    modalRef.componentInstance.data = JSON.stringify(sendForm);
  }

}
