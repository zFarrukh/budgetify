import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { LayoutModule } from '../layout/layout.module';
import { AccountComponent } from './main-page/account/account.component';
import { TransactionsComponent } from './main-page/transactions/transactions.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule,
  ],
})
export class MainModule {}
