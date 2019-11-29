import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  public audioObj = new Audio();
  public songData = new EventEmitter();
  public songTime = new EventEmitter();
  public currentSong: string;
  public lastSong: string;

  constructor(private http: HttpClient) {
    this.audioObj.src = 'http://localhost:3000/streaming';
    this.audioObj.addEventListener('loadeddata', () => {
      this.songData.emit({ duration: this.audioObj.duration, title: this.currentSong });
    });
    this.audioObj.addEventListener('timeupdate', () => {
      this.songTime.emit(this.audioObj.currentTime);
    });
  }

  play() {
    this.audioObj.load();
    this.audioObj.play();
  }

  toggleState(state: boolean) {
    state === true ? this.audioObj.play() : this.audioObj.pause();
  }

  pause() {
    this.audioObj.pause();
  }
  unPause() {
    this.audioObj.play();
  }

  setTime(current: number) {
    this.audioObj.currentTime = current;
  }


  async updateStream(title: string) {
    this.currentSong = title;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    await this.http.post<any>('/streaming', { title }, { headers }).toPromise();
    // this.audioObj.load();
  }
}
