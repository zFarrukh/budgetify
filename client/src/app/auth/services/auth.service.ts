import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  user: any = null;
  get myUser() {
    return this.user;
  }
  login(email: string, password: string): Observable<User> {
    return this.http
      .post('http://localhost:3000/user/login', {
        email,
        password,
      })
      .pipe(
        tap((res: User | any) => {
          this.setSession(res);
        })
      );
  }

  private setSession(data: User): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem(
      'expiresIn',
      (new Date().getTime() + 3600 * 1000).toString()
    );
    this.user = data;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const expiresIn = localStorage.getItem('expiresIn');
    if (!expiresIn) {
      return false;
    }
    const expiresAt = Number(expiresIn);
    if (expiresAt < new Date().getTime()) {
      return false;
    }
    return true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.user = null;
  }
}
