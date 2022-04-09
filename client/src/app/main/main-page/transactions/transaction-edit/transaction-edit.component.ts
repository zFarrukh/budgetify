import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { ITransaction } from '../transaction.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements OnInit {
  transaction!: ITransaction | null;
  categories!: ICategory[] | null;
  isEditMode = false;
  @ViewChild('drawer') drawer: any;
  open = false;
  transactionForm = new FormGroup({
    type: new FormControl('', Validators.required),
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', Validators.required),
  });

  onClose() {
    this.drawer.close();
    this.transaction = null;
    this.isEditMode = false;
    this.open = false;
    this.transactionForm.reset();
  }
  constructor(
    private transactionsService: TransactionsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.transactionsService.editTransaction.subscribe({
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

    this.transactionsService.addTransaction.subscribe({
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
  }
}
