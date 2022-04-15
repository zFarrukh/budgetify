import { Component, OnInit } from '@angular/core';
import { IAccount } from './account.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accounts: IAccount[] = [];
  selectedAccount: IAccount | undefined;

  selectAccount(account: IAccount) {
    if (this.selectedAccount !== account) {
      this.accountService.selectAccount.next(account);
      this.accountService.selectedAccount = account;
    }
    this.selectedAccount = account;
  }
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.selectedAccount = accounts[0];
      },
    });

    this.accountService.selectAccount.subscribe({
      next: (res) => {
        this.selectedAccount = res;
      },
    });

    this.accountService.deleteAccount.subscribe({
      next: (res) => {
        this.accounts = this.accounts.filter((acc) => acc._id !== res._id);
        this.selectedAccount = this.accounts[0];
      },
    });

    this.accountService.updateAccount.subscribe({
      next: (res) => {
        const index = this.accounts.findIndex((acc) => acc._id === res._id);
        this.accounts[index] = res;
      },
    });
  }
}
