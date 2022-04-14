import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  @Output() addCategory = new EventEmitter();
  @ViewChild('drawer') drawer: any;
  open = false;

  categoryForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
  });

  onClose() {
    this.drawer.close();
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
      next: (category) => {
        setTimeout(() => {
          this.drawer.open();
          this.open = true;
        }, 0);
      },
    });
  }
}
