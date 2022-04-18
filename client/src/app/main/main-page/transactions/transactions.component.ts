import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { IAccount } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { ITransaction } from './transaction.model';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class TransactionsComponent implements OnInit {
  transactions: ITransaction[] = this.transactionsService.transactions;
  selectedAccount!: IAccount;
  currency = '';
  isDeletedTransaction = false;
  subscription: Subscription = new Subscription();

  onSelectTransaction(transaction: ITransaction) {
    this.transactionsService.selectedTransaction.next(transaction);
  }

  openAddTransaction() {
    this.transactionsService.addTransactionMode.next(true);
  }

  openAddAccount() {
    this.accountService.addAccountMode.next(true);
  }

  openAccountDetail() {
    this.accountService.accountDetail.next(this.selectedAccount);
  }

  onDeleteTransaction(transaction: ITransaction) {
    this.subscription.add(
      this.transactionsService
        .deleteTransactionById(transaction._id)
        .subscribe({
          next: (res: ITransaction) => {
            this.transactions = this.transactions.filter(
              (transaction) => transaction._id !== res._id
            );
            this.isDeletedTransaction = true;
            setTimeout(() => {
              this.isDeletedTransaction = false;
            }, 2000);
          },
        })
    );
  }

  addTransaction(transaction: ITransaction) {
    this.subscription.add(
      this.transactionsService.addTransaction(transaction).subscribe({
        next: (res: ITransaction) => {
          this.transactions.push(res);
        },
      })
    );
  }

  addAccount(account: IAccount) {
    this.subscription.add(
      this.accountService.addAccount(account).subscribe({
        next: (res: IAccount) => {
          this.accountService.selectAccount.next(res);
        },
      })
    );
  }

  updateTransaction(transaction: ITransaction) {
    this.subscription.add(
      this.transactionsService
        .updateTransaction(transaction._id, transaction)
        .subscribe({
          next: (res: ITransaction) => {
            this.transactions = this.transactions.map((item) => {
              if (item._id === transaction._id) {
                return res;
              }
              return item;
            });
          },
        })
    );
  }

  constructor(
    private transactionsService: TransactionsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.accountService.selectAccount.subscribe({
        next: (account: IAccount) => {
          if (account) {
            this.transactionsService.getTransactions(account._id).subscribe({
              next: (res: ITransaction[]) => {
                this.transactions = res;
                this.currency = account.currency;
                this.selectedAccount = account;
              },
            });
          }
        },
      })
    );
  }
}
