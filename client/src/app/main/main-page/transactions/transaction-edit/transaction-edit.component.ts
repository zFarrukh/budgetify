import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements OnInit {
  transaction!: ITransaction | null;
  isEditMode = false;
  @ViewChild('drawer') drawer: any;
  open = false;

  onClose() {
    this.drawer.close();
    this.transaction = null;
    this.isEditMode = false;
    this.open = false;
  }
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.editTransaction.subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.isEditMode = true;
        this.open = true;
        setTimeout(() => {
          this.drawer.open();
        }, 0);
      },
    });

    this.transactionsService.addTransaction.subscribe({
      next: (isOpen) => {
        this.isEditMode = false;
        this.open = true;
        setTimeout(() => {
          this.drawer.open();
        }, 0);
      },
    });
  }
}
