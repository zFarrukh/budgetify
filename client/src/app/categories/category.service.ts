import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories: ICategory[] = [];
  public addCategoryMode = new Subject<boolean>();

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(`${environment.API_URL}/categories`, {})
      .pipe(
        tap({
          next: (res: ICategory[]) => {
            this.categories = res;
          },
        })
      );
  }

  deleteCategoryById(id: string): Observable<ICategory> {
    return this.http
      .delete<ICategory>(`${environment.API_URL}/categories/${id}`)
      .pipe(
        tap({
          next: (res: ICategory) => {
            this.categories = this.categories.filter(
              (category: ICategory) => category._id !== res._id
            );
          },
        })
      );
  }

  updateCategoryById(
    id: string,
    payload: { title: string }
  ): Observable<ICategory> {
    return this.http
      .put<ICategory>(`${environment.API_URL}/categories/${id}`, payload)
      .pipe(
        tap({
          next: (res: ICategory) => {
            this.categories = this.categories.map((category: ICategory) => {
              if (category._id === res._id) {
                return res;
              }
              return category;
            });
          },
        })
      );
  }

  addCategory(payload: { title: string; type: string }): Observable<ICategory> {
    return this.http
      .post<ICategory>(`${environment.API_URL}/categories`, payload)
      .pipe(
        tap({
          next: (res: ICategory) => {
            this.categories.push(res);
          },
        })
      );
  }

  constructor(private http: HttpClient) {}
}
