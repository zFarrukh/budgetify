import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ITransaction } from './transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public transactions: ITransaction[] = [];
  public selectedTransaction = new Subject<ITransaction>();

  getTransactions(account_id: string): Observable<any> {
    return this.http
      .get('http://localhost:3000/transactions', {
        params: {
          account_id: account_id,
        },
      })
      .pipe(
        tap({
          next: (res: any) => {
            this.transactions = res;
          },
        })
      );
  }

  constructor(private http: HttpClient) {}
}
