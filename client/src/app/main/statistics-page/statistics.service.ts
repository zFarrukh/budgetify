import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryStatistics, IMonthlyStatistics } from './statistics.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  getMonthlyStatistics(account_id: string): Observable<IMonthlyStatistics[]> {
    return this.http.get<IMonthlyStatistics[]>(
      `${environment.API_URL}/statistics?account_id=${account_id}`
    );
  }

  getCategoryStatistics(account_id: string): Observable<ICategoryStatistics> {
    return this.http.get<ICategoryStatistics>(
      `${environment.API_URL}/statistics/category?account_id=${account_id}`
    );
  }

  constructor(private http: HttpClient) {}
}
