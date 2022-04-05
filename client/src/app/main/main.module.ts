import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
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
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainModule {}
