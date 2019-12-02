import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private audioObj = new Audio();
  public songData = new EventEmitter();
  public songTime = new EventEmitter();
  private currentSong: string;
  constructor(private http: HttpClient, private socket: Socket) {
    socket.on('play', (title) => {
      this.currentSong = title;
      this.audioObj.load();
      this.audioObj.play();
    });
    socket.on('stop', () => {
      this.audioObj.pause();
      this.songData.emit({ duration: 0, title: '' });
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
    this.socket.emit('play', { title: this.currentSong });
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

  stop() {
    this.socket.emit('stop');
  }

  setVolume(volume: number) {
    this.audioObj.volume = volume;
  }


  async updateStream(title: string) {
    this.currentSong = title;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    await this.http.post<any>('/streaming', { title }, { headers }).toPromise();
  }
}
