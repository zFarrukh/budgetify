import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IAccount } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: IAccount[] = [];
  public selectAccount = new Subject<IAccount>();

  getAccounts(): Observable<any> {
    return this.http.get('http://localhost:3000/accounts').pipe(
      tap({
        next: (res: IAccount[] | any) => {
          this.accounts = res;
          this.selectAccount.next(this.accounts[0]);
        },
      })
    );
  }

  constructor(private http: HttpClient) {}
}
