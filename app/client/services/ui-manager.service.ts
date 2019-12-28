import { Injectable, QueryList } from '@angular/core';
import { SongComponent } from '../components/song/song.component';

@Injectable({
  providedIn: 'root'
})
export class UIManagerService {
  private lastPlayedSongID: number;
  private songs: QueryList<SongComponent>;

  constructor() {

  }

  setSongs(songs: QueryList<SongComponent>) {
    this.songs = songs;
  }

  stop() {
    this.songs.toArray()[this.lastPlayedSongID].playing = false;
  }
  played(newSongID: number) {
    if (this.lastPlayedSongID !== undefined) {
      this.songs.toArray()[this.lastPlayedSongID].playing = false;
    }
    this.songs.toArray()[newSongID].playing = true;
    this.lastPlayedSongID = newSongID;


  }
  getSongID(songName: string): number {
    return this.songs.toArray().filter(song => song.title === songName)[0].id;
  }
}
