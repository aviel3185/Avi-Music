import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  public audioObj = new Audio();
  public songData = new EventEmitter();
  public songTime = new EventEmitter();
  public currentSong: string;
  public lastSong: string;

  constructor(private http: HttpClient, private socket: Socket) {
    socket.on('refresh', () => {
      console.log('refreshed');
      this.audioObj.load();
      this.audioObj.play();
    });
    this.audioObj.src = 'http://localhost:3000/streaming';
    this.audioObj.addEventListener('loadeddata', () => {
      this.songData.emit({ duration: this.audioObj.duration, title: this.currentSong });
    });
    this.audioObj.addEventListener('timeupdate', () => {
      this.songTime.emit(this.audioObj.currentTime);
    });
  }

  play() {
    this.socket.emit('refresh');
  }

  setTime(value) {
    this.audioObj.currentTime = value;
    // this.audioObj.fastSeek()
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


  async updateStream(title: string) {
    this.currentSong = title;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    await this.http.post<any>('/streaming', { title }, { headers }).toPromise();
    // this.audioObj.load();
  }
}
