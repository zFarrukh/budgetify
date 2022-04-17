import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
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

  openDialog() {
    if (this.account) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '300px',
        data: {
          title: 'Account',
          message: 'Are you sure you want to delete account?',
          id: this.account._id,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.onDeleteAccount();
        }
      });
    }
  }

  onEditAccount(): void {
    if (this.account) {
      this.accountService.editAccountMode.next(this.account);
      this.drawer.close();
      this.account = null;
    }
  }

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

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
