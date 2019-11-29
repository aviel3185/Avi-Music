import { Component, OnInit } from '@angular/core';
import { SongsService } from 'app/client/services/songs.service';
import { SongComponent } from '../song/song.component';
import { MusicService } from 'app/client/services/music.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public songs: string[];
  public searchQuery: string;
  public lastPlayedSong: SongComponent;
  constructor(private songsService: SongsService, private musicService: MusicService) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.songs = await this.songsService.getSongs();
  }

  async playedSong(update: SongComponent) {
    if (this.lastPlayedSong) {
      this.lastPlayedSong.playing = false;
    }
    this.lastPlayedSong = update;
    this.musicService.play();
    // if (this.lastPlayedSong && this.lastPlayedSong !== update) {
    //   this.lastPlayedSong.playing = false;
    // }
    // update.playing = !update.playing;
    // if (this.lastPlayedSong.title !== update.title) {
    //   await this.musicService.updateStream(update.title);
    // }
    // this.lastPlayedSong = update;
    // update.playing === true ? this.musicService.play() : this.musicService.pause();
  }

}
