import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { QueryComponent } from './../query/query.component';
import { StaticService } from '../../services';

@Component({
  selector: 'app-cta-buttons',
  templateUrl: './cta-buttons.component.html',
  styleUrls: ['./cta-buttons.component.scss']
})
export class CtaButtonsComponent implements OnInit {

  data: any;
  public lightTheme = true;
  @Output() sec = new EventEmitter();
  @Output() ter = new EventEmitter();
  @Input() primary: boolean;
  @Input() secondary: boolean;
  @Input() terciary: boolean;
  @Input() pText: string;
  @Input() sText: string;
  @Input() tText: string;
  @Input() changeTheme: boolean;
  @Input() interest: string;
  @Input() buttonsStart: boolean;

  constructor(
    private statisData: StaticService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.data = this.statisData.data.components.cta;
    if ( this.changeTheme) { this.lightTheme = !this.lightTheme; }
  }

  openModal() {
    const modalRef = this.modalService.open(QueryComponent, {size: 'lg', centered: true});
    if (this.interest) {
      modalRef.componentInstance.data = JSON.stringify(this.interest);
    }
  }

  getSec() {
    this.sec.emit(true);
  }

  getTer() {
    this.ter.emit(true);
  }

}
