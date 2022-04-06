import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../auth.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

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
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
