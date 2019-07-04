import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { StaticService } from '../../services/static.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public externalLinkIcon = faExternalLinkSquareAlt;

  constructor(
    public router: Router,
    public staticData: StaticService,
    @Inject(DOCUMENT) private document: any
  ) { }

  isExpanded = false;
  logo: any;

  ngOnInit() {
    this.logo = this.staticData.logo;
  }

  toQueo() {
    this.isExpanded = false;
    this.document.location.href = 'https://queo.com.ar';
  }

}
