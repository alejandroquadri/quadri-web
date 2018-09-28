import { Component, OnInit } from '@angular/core';
import { StaticService } from '../../services';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  data: any;

  constructor(
    private staticData: StaticService
  ) { }

  ngOnInit() {
    this.data = this.staticData.data.components.steps;
  }

}
