import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {
  @Input() searchValue = '';
  @Output() emitValue = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  changed(val) {
    this.searchValue = val;
    this.emitValue.emit(val);
  }
}
