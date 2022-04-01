import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    component: CategoriesPageComponent,
  },
];

@NgModule({
  declarations: [CategoriesPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CategoriesModule {}
