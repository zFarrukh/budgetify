import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAccount } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts: IAccount[] = [];

  getAccounts(): Observable<any> {
    return this.http.get('http://localhost:3000/accounts').pipe(
      tap({
        next: (res: IAccount[] | any) => {
          this.accounts = res;
        },
      })
    );
  }

  constructor(private http: HttpClient) {}
}
