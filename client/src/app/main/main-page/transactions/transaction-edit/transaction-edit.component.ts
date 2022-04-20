import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { DrawerService } from 'src/app/main/drawer.service';
import { IAccount } from '../../account/account.model';
import { AccountService } from '../../account/account.service';
import { ITransaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
@UntilDestroy({ checkProperties: true })
export class TransactionEditComponent implements OnInit {
  @Output() updateTransaction = new EventEmitter<ITransaction>();
  @Output() addTransaction = new EventEmitter<ITransaction>();
  subscription: Subscription = new Subscription();
  transaction!: ITransaction | null;
  categories!: ICategory[] | null;
  selectedAccount!: IAccount;
  isEditMode = false;
  open = false;
  transactionForm = new FormGroup({
    type: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    description: new FormControl(''),
    category: new FormControl(null, [Validators.required]),
    title: new FormControl(null, Validators.required),
  });

  onClose() {
    this.transaction = null;
    this.isEditMode = false;
    this.open = false;
    this.transactionForm.reset();
    this.transactionForm.markAsUntouched();
    this.drawerService.isOpen.next(false);
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
    private accountService: AccountService,
    private drawerService: DrawerService
  ) {
    this.selectedAccount = this.accountService.selectedAccount;
  }

  ngOnInit(): void {
    this.subscription.add(
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
        },
      })
    );

    this.subscription.add(
      this.transactionsService.addTransactionMode.subscribe({
        next: () => {
          this.isEditMode = false;
          this.open = true;
        },
      })
    );

    this.subscription.add(
      this.categoryService.getCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      })
    );

    this.subscription.add(
      this.accountService.selectAccount.subscribe({
        next: (account) => {
          this.selectedAccount = account;
        },
      })
    );
  }
}
