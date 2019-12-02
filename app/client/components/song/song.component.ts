import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SongsService } from 'app/client/services/songs.service';
import { MusicService } from 'app/client/services/music.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @Input() isFavorite = false;
  @Input() title: string;
  @Input() playing = false;
  @Output() notifyOnPlay: EventEmitter<SongComponent> = new EventEmitter<SongComponent>();
  constructor(private songsService: SongsService, private musicService: MusicService) { }

  ngOnInit() {
  }

  like() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.songsService.addFavorite(this.title);
    } else {
      this.songsService.removeFavorite(this.title);
    }
    console.log(this.songsService.getFavorites());
  }

  async play() {
    if (!this.playing) {
      await this.musicService.updateStream(this.title);
      this.notifyOnPlay.emit(this);
    } else {
      this.musicService.stop();

    }
    this.playing = !this.playing;
  }

}
