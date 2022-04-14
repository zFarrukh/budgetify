import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category!: ICategory;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  isEditMode = false;

  categoryForm = new FormGroup({
    title: new FormControl({ value: '', disabled: !this.isEditMode }, [
      Validators.required,
    ]),
  });

  onDeleteCategory(id: string) {
    this.delete.emit(id);
  }

  onEditMode() {
    this.isEditMode = true;
    this.categoryForm.controls['title'].enable();
  }

  onUpdateCategory() {
    this.isEditMode = false;
    this.update.emit({
      title: this.categoryForm.value.title,
      id: this.category._id,
    });
    this.categoryForm.controls['title'].disable();
  }

  ngOnInit(): void {
    if (this.category && this.category.title) {
      this.categoryForm.setValue({
        title: this.category.title,
      });
    }
  }
}
