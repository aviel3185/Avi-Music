import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'app/client/services/music.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { SongsService } from 'app/client/services/songs.service';

@Component({
  selector: 'app-playing-now',
  templateUrl: './playing-now.component.html',
  styleUrls: ['./playing-now.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: 115, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 115, opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class PlayingNowComponent implements OnInit {
  public play = true;
  @Input() isFavorite = true;
  public title = '';
  public duration = '';
  public currentTime = '0:00';

  constructor(public musicService: MusicService, private songService: SongsService) { }

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
    this.play === true ? this.musicService.unPause() : this.musicService.pause();
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

  async playNext() {
    const song = await this.songService.getRandom();
    await this.musicService.updateStream(song);
    this.musicService.play();
  }

  like() {
    this.isFavorite = !this.isFavorite;
  }
}
