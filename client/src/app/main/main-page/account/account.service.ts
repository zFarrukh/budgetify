import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccount } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: IAccount[] = [];
  public selectAccount = new Subject<IAccount>();

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${environment.API_URL}/accounts`).pipe(
      tap({
        next: (res: IAccount[]) => {
          this.accounts = res;
          this.selectAccount.next(this.accounts[0]);
        },
      })
    );
  }

  constructor(private http: HttpClient) {}
}
