import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent {
  @Output() addCategory = new EventEmitter();
  subscription: Subscription = new Subscription();
  categoryForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
  });

  onClose() {
    this.categoryForm.reset();
    this.categoryService.closeCategoryMode.next(true);
  }

  onAddCategory() {
    this.addCategory.emit(this.categoryForm.value);
    this.onClose();
  }

  constructor(private categoryService: CategoryService) {}
}
