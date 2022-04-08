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
  }
}
