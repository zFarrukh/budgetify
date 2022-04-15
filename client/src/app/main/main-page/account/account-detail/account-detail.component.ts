import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IAccount } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
  @Input() currency!: string;
  @ViewChild('drawer') drawer: any;
  account: IAccount | null = null;
  selectedAccount: IAccount | null = null;
  onClose(): void {
    this.drawer.close();
    this.account = null;
  }

  onDeleteAccount(): void {
    if (this.account) {
      this.accountService.deleteAccount.next(this.account);
      this.accountService.deleteAccountById(this.account._id).subscribe();
      this.drawer.close();
      this.account = null;
    }
  }

  onEditAccount(): void {
    if (this.account) {
      this.accountService.editAccountMode.next(this.account);
      this.drawer.close();
      this.account = null;
    }
  }

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.accountDetail.subscribe({
      next: () => {
        this.account = this.selectedAccount;
        setTimeout(() => {
          this.drawer.open();
        }, 0);
      },
    });

    this.accountService.selectAccount.subscribe({
      next: (account: IAccount) => {
        this.selectedAccount = account;
      },
    });
  }
}
