import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ITransaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() currency!: string;
  @Output() deletedTransaction = new EventEmitter<ITransaction>();
  @ViewChild('drawer') drawer: any;
  transaction: ITransaction | null = null;

  onClose(): void {
    this.drawer.close();
    this.transaction = null;
  }

  openDialog(): void {
    if (this.transaction) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '300px',
        data: {
          title: 'transaction',
          message: 'Are you sure you want to delete transaction?',
          id: this.transaction._id,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.onDeleteTransaction();
        }
      });
    }
  }

  onDeleteTransaction(): void {
    if (this.transaction) {
      this.deletedTransaction.emit(this.transaction);
      this.drawer.close();
      this.transaction = null;
    }
  }

  onEditTransaction(): void {
    if (this.transaction) {
      this.transactionsService.editTransactionMode.next(this.transaction);
      this.drawer.close();
      this.transaction = null;
    }
  }

  constructor(
    private transactionsService: TransactionsService,
    private dialog: MatDialog
  ) {}

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
