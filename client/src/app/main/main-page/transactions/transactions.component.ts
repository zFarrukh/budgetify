import { Component, OnInit } from '@angular/core';
import { IAccount } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { ITransaction } from './transaction.model';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: ITransaction[] = this.transactionsService.transactions;
  currency = '';

  onSelectTransaction(transaction: ITransaction) {
    this.transactionsService.selectedTransaction.next(transaction);
    console.log(transaction);
  }

  constructor(
    private transactionsService: TransactionsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.selectAccount.subscribe({
      next: (account: IAccount) => {
        this.transactionsService.getTransactions(account._id).subscribe({
          next: (res: any) => {
            this.transactions = res;
            this.currency = account.currency;
          },
        });
      },
    });
  }
}
