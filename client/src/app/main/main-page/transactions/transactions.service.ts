import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ITransaction } from './transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public transactions: ITransaction[] = [];
  public deletedTransaction!: ITransaction;
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

  deleteTransactionById(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/transactions/${id}`).pipe(
      tap({
        next: (res: any) => {
          this.deletedTransaction = res;
        },
      })
    );
  }

  constructor(private http: HttpClient) {}
}