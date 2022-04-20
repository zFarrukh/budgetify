import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ITransaction } from './transaction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public transactions: ITransaction[] = [];
  public onChangeTransactions = new Subject<ITransaction[]>();
  public selectedTransaction = new Subject<ITransaction>();
  public editTransactionMode = new Subject<ITransaction>();
  public addTransactionMode = new Subject<boolean>();

  addTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http
      .post<ITransaction>(`${environment.API_URL}/transactions`, transaction)
      .pipe(
        tap({
          next: (transaction: ITransaction) => {
            this.transactions.push(transaction);
            this.onChangeTransactions.next(this.transactions);
          },
        })
      );
  }

  updateTransaction(
    id: string,
    transaction: ITransaction
  ): Observable<ITransaction> {
    return this.http
      .put<ITransaction>(
        `${environment.API_URL}/transactions/${id}`,
        transaction
      )
      .pipe(
        tap({
          next: (transaction) => {
            this.transactions = this.transactions.map((item) => {
              if (item._id === id) {
                return transaction;
              }
              return item;
            });
            this.onChangeTransactions.next(this.transactions);
          },
        })
      );
  }

  getTransactions(account_id: string): Observable<ITransaction[]> {
    return this.http
      .get<ITransaction[]>(`${environment.API_URL}/transactions`, {
        params: {
          account_id: account_id,
        },
      })
      .pipe(
        tap({
          next: (res: ITransaction[]) => {
            this.transactions = res;
          },
        })
      );
  }

  deleteTransactionById(id: string): Observable<ITransaction> {
    return this.http
      .delete<ITransaction>(`${environment.API_URL}/transactions/${id}`)
      .pipe(
        tap({
          next: (transaction) => {
            this.transactions = this.transactions.filter((item) => {
              return item._id !== transaction._id;
            });
            this.onChangeTransactions.next(this.transactions);
          },
        })
      );
  }

  constructor(private http: HttpClient) {}
}
