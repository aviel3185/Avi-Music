import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  constructor(private http: HttpClient) { }

  getSongs() {
    return this.http.get<string[]>('/api/songs').toPromise();
  }

  getRandom() {
    return this.http.get<string>('/api/songs/random').toPromise();
  }

  postSong(song: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', song, song.name);
    return this.http.post('/api/songs', formData).toPromise();
  }
}
