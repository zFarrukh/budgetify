import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITransaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() currency!: string;
  @ViewChild('drawer') drawer: any;
  transaction: ITransaction | null = null;
  onClose(): void {
    this.drawer.close();

    this.transaction = null;
  }

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.selectedTransaction.subscribe({
      next: (transaction: ITransaction) => {
        this.transaction = transaction;
        setTimeout(() => {
          this.drawer.open();
        }, 0);
      },
    });
  }
}
