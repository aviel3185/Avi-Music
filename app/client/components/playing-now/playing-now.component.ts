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
  public duration: number;
  public currentTime = 0;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.musicService.songData.subscribe((songdata: any) => {
      this.title = songdata.title;
      this.duration = songdata.duration;
      this.currentTime = 0;
      this.play = true;
    });
    this.musicService.songTime.subscribe((songtime) => {
      this.currentTime = songtime;
    });
  }

  state() {
    this.play = !this.play;
    if (this.play) {
      this.musicService.unPause();
    } else {
      this.musicService.pause();
    }

  }


  like() {
    this.isFavorite = !this.isFavorite;
  }
}
