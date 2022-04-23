import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMonthlyStatistics } from '../main/statistics-page/statistics.model';
import {
  ICategoryAdminStatistics,
  IMonthlyAdminStatistics,
} from './adminStats.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  getMonthlyStatistics(options?: {
    fromDate: Date;
    toDate: Date;
  }): Observable<IMonthlyAdminStatistics> {
    if (options?.fromDate || options?.toDate) {
      const result = new Date();
      result.setDate(options.toDate.getDate() + 1);
      return this.http.get<IMonthlyAdminStatistics>(
        `${environment.API_URL}/admin/monthly?fromDate=${options.fromDate}&toDate=${result}`
      );
    }
    return this.http.get<IMonthlyAdminStatistics>(
      `${environment.API_URL}/admin/monthly`
    );
  }

  getCategoryStatistics(options?: {
    fromDate: Date;
    toDate: Date;
  }): Observable<ICategoryAdminStatistics> {
    if (options) {
      const result = new Date();
      result.setDate(options.toDate.getDate() + 1);
      return this.http.get<ICategoryAdminStatistics>(
        `${environment.API_URL}/admin/category?fromDate=${options.fromDate}&toDate=${result}`
      );
    }
    return this.http.get<ICategoryAdminStatistics>(
      `${environment.API_URL}/admin/category`
    );
  }

  getTotalAndAverageStatistics(statistics: IMonthlyStatistics[]): {
    total: {
      income: number;
      expense: number;
      economy: number;
      economy_percentage: number;
    };
    average: {
      income: number;
      expense: number;
      economy: number;
      economy_percentage: number;
    };
  } {
    const incomeTotal = statistics.reduce((acc, cur) => {
      return acc + cur.income;
    }, 0);
    const expenseTotal = statistics.reduce((acc, cur) => {
      return acc + cur.expense;
    }, 0);
    const economyTotal = incomeTotal - expenseTotal;
    const economy_percentageTotal = (economyTotal / incomeTotal) * 100;
    const average = {
      income: incomeTotal / statistics.length,
      expense: expenseTotal / statistics.length,
      economy: economyTotal / statistics.length,
      economy_percentage: economy_percentageTotal / statistics.length,
    };
    return {
      total: {
        income: incomeTotal,
        expense: expenseTotal,
        economy: economyTotal,
        economy_percentage: economy_percentageTotal,
      },
      average,
    };
  }

  constructor(private http: HttpClient) {}
}
