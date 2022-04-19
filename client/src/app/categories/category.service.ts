import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public closeCategoryMode = new Subject<boolean>();

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.API_URL}/categories`, {});
  }

  deleteCategoryById(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(
      `${environment.API_URL}/categories/${id}`
    );
  }

  updateCategoryById(
    id: string,
    payload: { title: string }
  ): Observable<ICategory> {
    return this.http.put<ICategory>(
      `${environment.API_URL}/categories/${id}`,
      payload
    );
  }

  addCategory(payload: { title: string; type: string }): Observable<ICategory> {
    return this.http.post<ICategory>(
      `${environment.API_URL}/categories`,
      payload
    );
  }

  constructor(private http: HttpClient) {}
}
