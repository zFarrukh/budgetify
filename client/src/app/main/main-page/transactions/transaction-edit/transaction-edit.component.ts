import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { IAccount } from '../../account/account.model';
import { AccountService } from '../../account/account.service';
import { ITransaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements OnInit {
  @Output() updateTransaction = new EventEmitter<ITransaction>();
  @Output() addTransaction = new EventEmitter<ITransaction>();
  transaction!: ITransaction | null;
  categories!: ICategory[] | null;
  selectedAccount!: IAccount;
  isEditMode = false;
  @ViewChild('drawer') drawer: any;
  open = false;
  transactionForm = new FormGroup({
    type: new FormControl('expense', Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    description: new FormControl(''),
    category: new FormControl(null, [Validators.required]),
    title: new FormControl(null, Validators.required),
  });

  onClose() {
    this.drawer.close();
    this.transaction = null;
    this.isEditMode = false;
    this.open = false;
    this.transactionForm.reset();
  }

  onSubmit() {
    if (this.isEditMode) {
      if (this.transaction) {
        const payload = this.transactionForm.value;
        payload._id = this.transaction._id;
        this.updateTransaction.emit(payload);
        this.onClose();
      }
    } else {
      const payload = this.transactionForm.value;
      payload.account_id = this.selectedAccount._id;
      this.addTransaction.emit(payload);
      this.onClose();
    }
  }

  constructor(
    private transactionsService: TransactionsService,
    private categoryService: CategoryService,
    private accountService: AccountService
  ) {
    this.selectedAccount = this.accountService.selectedAccount;
  }

  ngOnInit(): void {
    this.transactionsService.editTransactionMode.subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.isEditMode = true;
        this.transactionForm.patchValue({
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          category: transaction.category,
          title: transaction.title,
        });
        this.open = true;
        setTimeout(() => {
          this.drawer.open();
        }, 0);
      },
    });

    this.transactionsService.addTransactionMode.subscribe({
      next: (isOpen) => {
        this.isEditMode = false;
        this.open = true;
        setTimeout(() => {
          this.drawer.open();
        }, 0);
      },
    });

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });

    this.accountService.selectAccount.subscribe({
      next: (account) => {
        this.selectedAccount = account;
      },
    });
  }
}
