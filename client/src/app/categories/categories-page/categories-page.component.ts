import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { ICategory } from '../category.model';
import { CategoryService } from '../category.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  categories: ICategory[] = [];
  subscription: Subscription = new Subscription();

  constructor(private categoryService: CategoryService) {}

  getCategories() {
    this.subscription.add(
      this.categoryService.getCategories().subscribe({
        next: (categories: ICategory[]) => {
          this.categories = categories;
        },
      })
    );
  }

  onDeleteCategory(id: string) {
    this.subscription.add(
      this.categoryService.deleteCategoryById(id).subscribe({
        next: (res) => {
          this.categories = this.categories.filter(
            (category) => category._id !== res._id
          );
        },
      })
    );
  }

  onUpdateCategory(payload: { title: string; id: string }) {
    this.subscription.add(
      this.categoryService.updateCategoryById(payload.id, payload).subscribe({
        next: (res) => {
          this.categories = this.categories.map((category) => {
            if (category._id === res._id) {
              return res;
            }
            return category;
          });
        },
      })
    );
  }

  openAddCategory() {
    this.categoryService.addCategoryMode.next(true);
  }

  onAddCategory(payload: { title: string; type: string }) {
    this.subscription.add(
      this.categoryService.addCategory(payload).subscribe({
        next: () => {
          this.getCategories();
        },
      })
    );
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
