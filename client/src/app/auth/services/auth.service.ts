import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(environment.API_URL + '/user/login', {
        email,
        password,
      })
      .pipe(
        tap((res: User) => {
          this.setSession(res);
        })
      );
  }

  private setSession(data: User): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem(
      'expiresIn',
      (new Date().getTime() + data.expiresIn).toString()
    );
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
  }
}
