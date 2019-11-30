import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public SearchValue = '';
  constructor() { }

  ngOnInit() {
  }
}
