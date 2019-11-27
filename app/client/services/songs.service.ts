import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  // private favorites: string[] = Array.of(localStorage.getItem('favorites').split(','))[0] || Array.of('');
  constructor(private http: HttpClient) {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', '');
    } else {
      if (this.getFavorites()[0] === '') {
        this.removeFavorite('');
      }
    }
  }

  getSongs() {
    return this.http.get<string[]>('/api/songs').toPromise();
  }

  getFavorites(): string[] {
    return localStorage.getItem('favorites').split(',');
  }

  addFavorite(title: string) {
    const favorites = this.getFavorites();
    favorites.push(title);
    localStorage.setItem('favorites', favorites.toString());
  }

  removeFavorite(title: string) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(song => song !== title);
    localStorage.setItem('favorites', favorites.toString());
  }
}
