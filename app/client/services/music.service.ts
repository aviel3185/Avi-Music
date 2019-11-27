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
  public title: string;

  constructor(private http: HttpClient) {
    this.audioObj.src = 'http://localhost:3000/streaming';
    this.audioObj.addEventListener('loadeddata', () => {
      this.songData.emit({ duration: this.audioObj.duration, title: this.title });
    });
    this.audioObj.addEventListener('timeupdate', () => {
      this.songTime.emit(this.audioObj.currentTime);
    });
  }
  
  play() {
    this.audioObj.load();
    this.audioObj.play();
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
    this.title = title;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<any>('/streaming', { title }, { headers }).toPromise();
  }
}
