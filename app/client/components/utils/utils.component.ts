import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicService } from 'app/client/services/music.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public _volume: number;
  @Input() searchValue = '';
  @Output() emitValue = new EventEmitter<string>();

  get volume() {
    if (this._volume === 0) {
      return 'volume_off';
    } else if (this._volume < 1) {
      return 'volume_down';
    }
    return 'volume_up';
  }

  set volume(value: any) {
    this._volume = value;
    console.log(value);
    this.musicService.setVolume(value);
  }
  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.volume = 0.5;
  }
  changedSearchValue(val) {
    this.searchValue = val;
    this.emitValue.emit(val);
  }
}
