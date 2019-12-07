import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  public audioObj = new Audio();
  private currentSong: string;
  public volume = new EventEmitter();
  public songData = new EventEmitter();
  public songTime = new EventEmitter();
  constructor(private http: HttpClient, private socket: Socket) {
    socket.on('play', (title, volume) => {
      this.currentSong = title;
      this.audioObj.volume = volume;
      this.volume.emit(volume);
      this.audioObj.load();
      this.audioObj.play();
    });
    socket.on('stop', () => {
      this.audioObj.pause();
      this.songData.emit({ duration: 0, title: '' });
    });
    socket.on('volume', (volume) => {
      this.volume.emit(volume);
      this.audioObj.volume = volume;
    });
    socket.on('rewind', () => {
      this.audioObj.currentTime = 0;
    });
    socket.on('pause', () => {
      this.audioObj.pause();
    });
    socket.on('unpause', () => {
      this.audioObj.play();
    });

    this.audioObj.onended = () => {
      this.socket.emit('ended');
    };
    this.audioObj.addEventListener('loadeddata', () => {
      this.songData.emit({ duration: this.audioObj.duration, title: this.currentSong });
    });
    this.audioObj.addEventListener('timeupdate', () => {
      this.songTime.emit(this.audioObj.currentTime);
    });

    this.audioObj.src = 'http://localhost:3000/streaming';
  }

  rewind() {
    this.socket.emit('rewind');
  }

  play() {
    this.socket.emit('play', { title: this.currentSong });
  }

  toggleState(state: boolean) {
    state === true ? this.audioObj.play() : this.audioObj.pause();
  }

  pause() {
    this.socket.emit('pause');
  }
  unPause() {
    this.socket.emit('unpause');
  }

  stop() {
    this.socket.emit('stop');
  }

  setVolume(volume: number) {
    this.socket.emit('volume', volume);
  }


  updateStream(title: string) {
    this.currentSong = title;
    return this.http.post<any>('/streaming', { title }).toPromise();
  }
}
