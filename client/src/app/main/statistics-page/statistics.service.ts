import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryStatistics, IMonthlyStatistics } from './statistics.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  getMonthlyStatistics(
    account_id: string,
    options?: { fromDate: Date; toDate: Date }
  ): Observable<IMonthlyStatistics[]> {
    if (options) {
      const result = new Date();
      result.setDate(options.toDate.getDate() + 1);
      return this.http.get<IMonthlyStatistics[]>(
        `${environment.API_URL}/stats/monthly?account_id=${account_id}&fromDate=${options.fromDate}&toDate=${result}`
      );
    }
    return this.http.get<IMonthlyStatistics[]>(
      `${environment.API_URL}/stats/monthly?account_id=${account_id}`
    );
  }

  getCategoryStatistics(
    account_id: string,
    options?: { fromDate: Date; toDate: Date }
  ): Observable<ICategoryStatistics[]> {
    if (options) {
      const result = new Date();
      result.setDate(options.toDate.getDate() + 1);
      return this.http.get<ICategoryStatistics[]>(
        `${environment.API_URL}/stats/category?account_id=${account_id}&fromDate=${options.fromDate}&toDate=${result}`
      );
    }
    return this.http.get<ICategoryStatistics[]>(
      `${environment.API_URL}/stats/category?account_id=${account_id}`
    );
  }

  constructor(private http: HttpClient) {}
}
