import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../drawer.service';
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
  transactions: ITransaction[] = [];
  selectedAccount!: IAccount;
  currency = '';
  isDeletedTransaction = false;
  subscription: Subscription = new Subscription();

  onSelectTransaction(transaction: ITransaction) {
    this.transactionsService.selectedTransaction.next(transaction);
    this.drawerService.isOpen.next(true);
  }

  openAddTransaction() {
    this.transactionsService.addTransactionMode.next(true);
    this.drawerService.isOpen.next(true);
  }

  openAddAccount() {
    this.accountService.addAccountMode.next(true);
    this.drawerService.isOpen.next(true);
  }

  openAccountDetail() {
    this.accountService.accountDetail.next(this.selectedAccount);
    this.drawerService.isOpen.next(true);
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
    private accountService: AccountService,
    private drawerService: DrawerService
  ) {
    this.transactions = this.transactionsService.transactions;
  }

  ngOnInit(): void {
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
    });

    this.subscription.add(
      this.transactionsService.onChangeTransactions.subscribe({
        next: (transactions: ITransaction[]) => {
          this.transactions = transactions;
        },
      })
    );

    this.subscription.add(
      this.accountService.onCurrencyChange.subscribe({
        next: (currency: string) => {
          this.currency = currency;
        },
      })
    );

    if (this.accountService.currency) {
      this.currency = this.accountService.currency;
    }

    if (this.accountService.selectedAccount) {
      this.selectedAccount = this.accountService.selectedAccount;
    }
  }
}
