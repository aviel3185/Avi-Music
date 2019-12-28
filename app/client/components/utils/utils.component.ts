import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MusicService } from 'app/client/services/music.service';
import { UploadSongComponent } from '../upload-song/upload-song.component';
import { Socket } from 'ngx-socket-io';

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
  public peopleCount;

  get volume() {
    if (this._volume === 0) {
      return 'volume_off';
    } else if (this._volume < 1) {
      return 'volume_down';
    }
    return 'volume_up';
  }
  constructor(public musicService: MusicService, private bottomSheet: MatBottomSheet, socket: Socket) {
    socket.on('updatedCount', (count) => {
      this.peopleCount = count;
    });
  }

  ngOnInit() {
    this.musicService.volume.subscribe((volume) => {
      this._volume = volume;
    });
  }

  SetVolume(volume: number) {
    this.musicService.setVolume(volume);
  }

  changedSearchValue(val) {
    this.searchValue = val;
    this.emitValue.emit(val);
  }

  postSong() {
    this.bottomSheet.open(UploadSongComponent);
  }
}
