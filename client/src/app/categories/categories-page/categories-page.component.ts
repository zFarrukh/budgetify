import { Component, OnInit } from '@angular/core';
import { ICategory } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) {}

  onDeleteCategory(id: string) {
    this.categoryService.deleteCategoryById(id).subscribe({
      next: (res) => {
        this.categories = this.categories.filter(
          (category) => category._id !== res._id
        );
      },
    });
  }

  onUpdateCategory(payload: { title: string; id: string }) {
    this.categoryService.updateCategoryById(payload.id, payload).subscribe({
      next: (res) => {
        this.categories = this.categories.map((category) => {
          if (category._id === res._id) {
            return res;
          }
          return category;
        });
      },
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: ICategory[]) => {
        this.categories = res;
      },
    });
  }
}
