import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [CategoriesPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CategoriesModule {}
