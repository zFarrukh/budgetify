import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'statistics',
        component: StatisticsPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MainPageComponent, StatisticsPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
})
export class MainModule {}
