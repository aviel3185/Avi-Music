import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get token() {
    return localStorage.getItem('token');
  }

  public set token(token) {
    localStorage.setItem('token', token);
  }

  constructor(private http: HttpClient) {
  }

  getToken() {
    return this.http.get<string>('/authenticate');
  }
  isAdmin() {
    return this.http.get<boolean>('/api/isAdmin').toPromise();
  }

  getUsers() {
    return this.http.get<User[]>('/api/users').toPromise();
  }

  editAdmins(users: User[]) {
    return this.http.put<User[]>('/api/users', { users }).toPromise();
  }
}
