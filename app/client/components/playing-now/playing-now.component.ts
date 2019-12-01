import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'app/client/services/music.service';

@Component({
  selector: 'app-playing-now',
  templateUrl: './playing-now.component.html',
  styleUrls: ['./playing-now.component.scss']
})
export class PlayingNowComponent implements OnInit {
  public play = true;
  @Input() isFavorite = true;
  public title = '';
  public duration = '';
  public currentTime = '0:00';

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.musicService.songData.subscribe((songdata: any) => {
      this.title = songdata.title;
      this.duration = songdata.duration;
      this.currentTime = '0:00';
      this.play = true;
    });
    this.musicService.songTime.subscribe((songtime) => {
      this.currentTime = songtime;
    });
  }

  state() {
    this.play = !this.play;
    this.musicService.toggleState(this.play);
  }

  timestamp(seconds: number) {
    // tslint:disable-next-line: no-bitwise
    const min = ~~((seconds % 3600) / 60);
    // tslint:disable-next-line: no-bitwise
    const sec = ~~(seconds % 60);
    let time = '';
    time += '' + min + ':' + (sec < 10 ? '0' : '');
    time += '' + sec;
    return time;
  }

  like() {
    this.isFavorite = !this.isFavorite;
  }
}
