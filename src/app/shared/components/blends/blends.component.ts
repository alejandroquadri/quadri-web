import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticService } from '../../services';

@Component({
  selector: 'app-blends',
  templateUrl: './blends.component.html',
  styleUrls: ['./blends.component.scss']
})
export class BlendsComponent implements OnInit {

  @Input() colors: Array<any>;
  @Output() selected = new EventEmitter();
  colorsUrl: any;

  constructor(
    private staticData: StaticService
  ) { }

  ngOnInit() {
    this.colorsUrl = this.staticData.data.colors;
    
  }

  expand(color) {
  }

  select(color) {
    this.selected.emit(color);
  }

}
