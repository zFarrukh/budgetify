import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { LayoutModule } from '../layout/layout.module';
import { AccountComponent } from './main-page/account/account.component';
import { TransactionsComponent } from './main-page/transactions/transactions.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionDetailComponent } from './main-page/transactions/transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './main-page/transactions/transaction-edit/transaction-edit.component';
import { AccontDetailComponent } from './main-page/accont-detail/accont-detail.component';
import { AccontEditComponent } from './main-page/accont-edit/accont-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: TransactionsComponent,
      },
      {
        path: 'statistics',
        component: StatisticsPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainPageComponent,
    StatisticsPageComponent,
    AccountComponent,
    TransactionsComponent,
    TransactionDetailComponent,
    TransactionEditComponent,
    AccontDetailComponent,
    AccontEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
