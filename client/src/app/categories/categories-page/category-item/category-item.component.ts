import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ICategory } from '../../category.model';

@UntilDestroy({ checkProperties: true })
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
  subscription: Subscription = new Subscription();
  categoryForm = new FormGroup({
    title: new FormControl({ value: '', disabled: !this.isEditMode }, [
      Validators.required,
    ]),
  });

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: 'Category',
        message: 'Are you sure you want to delete category?',
        id: id,
      },
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((id) => {
        if (id) {
          this.onDeleteCategory(id);
        }
      })
    );
  }

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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.category && this.category.title) {
      this.categoryForm.setValue({
        title: this.category.title,
      });
    }
  }
}
