import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUserInfo(): Observable<{ user: UserInfo }> {
    return this.http.get<{ user: UserInfo }>(`${this.apiUrl}/get-info`);
  }
}

export interface User {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password?: string;
}

export interface UserInfo {
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}