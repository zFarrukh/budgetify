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
  public selectedTransaction = new Subject<ITransaction>();
  public editTransactionMode = new Subject<ITransaction>();
  public addTransactionMode = new Subject<boolean>();

  addTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(
      `${environment.API_URL}/transactions`,
      transaction
    );
  }

  updateTransaction(
    id: string,
    transaction: ITransaction
  ): Observable<ITransaction> {
    return this.http.put<ITransaction>(
      `${environment.API_URL}/transactions/${id}`,
      transaction
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
    return this.http.delete<ITransaction>(
      `${environment.API_URL}/transactions/${id}`
    );
  }

  constructor(private http: HttpClient) {}
}
