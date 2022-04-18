import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  @Output() addCategory = new EventEmitter();
  open = false;

  categoryForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
  });

  onClose() {
    this.open = false;
    this.categoryForm.reset();
  }

  onAddCategory() {
    this.addCategory.emit(this.categoryForm.value);
    this.onClose();
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.addCategoryMode.subscribe({
      next: () => {
        this.open = true;
      },
    });
  }
}
