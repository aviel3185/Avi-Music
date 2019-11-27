import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { SongsService } from 'app/client/services/songs.service';
import { EventEmitter } from 'events';
import { SongComponent } from '../song/song.component';
import { MusicService } from 'app/client/services/music.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public songs: string[];
  public lastPlayedSong: SongComponent;
  constructor(private songsService: SongsService, private musicService: MusicService) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.songs = await this.songsService.getSongs();
  }

  async playedSong(update: SongComponent) {
    await this.musicService.updateStream(update.title);
    if (this.lastPlayedSong && this.lastPlayedSong !== update) {
      this.lastPlayedSong.playing = false;
    }
    update.playing = !update.playing;
    this.lastPlayedSong = update;
    update.playing === true ? this.musicService.play() : this.musicService.pause();
  }

}
