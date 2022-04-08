import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../main-page/account/account.service';
import { ICategoryStatistics, IMonthlyStatistics } from './statistics.model';
import { StatisticsService } from './statistics.service';

import { dateValidator } from './statistics.validator';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  monthlyStatistics: IMonthlyStatistics[] = [];
  categoryStatistics: ICategoryStatistics[] = [];
  account_id = '';
  isCategoryStatistics = false;

  fetchData() {
    this.statisticsService
      .getCategoryStatistics(this.account_id, {
        fromDate: this.range.value.start,
        toDate: this.range.value.end,
      })
      .subscribe((data) => {
        this.categoryStatistics = data;
      });

    this.statisticsService
      .getMonthlyStatistics(this.account_id, {
        fromDate: this.range.value.start,
        toDate: this.range.value.end,
      })
      .subscribe((data) => {
        this.monthlyStatistics = data;
      });
  }

  range = new FormGroup({
    start: new FormControl(null, [Validators.required, dateValidator()]),
    end: new FormControl(null, [Validators.required, dateValidator()]),
  });

  showCategoryStatistics() {
    this.isCategoryStatistics = true;
  }

  showMonthlyStatistics() {
    this.isCategoryStatistics = false;
  }

  constructor(
    private statisticsService: StatisticsService,
    private accountService: AccountService
  ) {
    if (
      this.accountService.selectedAccount &&
      this.accountService.selectedAccount._id
    ) {
      this.account_id = this.accountService.selectedAccount._id;
    }
  }

  ngOnInit(): void {
    this.accountService.selectAccount.subscribe((account) => {
      this.account_id = account._id;
      this.statisticsService
        .getMonthlyStatistics(this.account_id)
        .subscribe((statistics) => {
          this.monthlyStatistics = statistics;
        });
      this.statisticsService
        .getCategoryStatistics(this.account_id)
        .subscribe((statistics) => {
          this.categoryStatistics = statistics;
        });
    });
    if (this.account_id) {
      this.statisticsService
        .getMonthlyStatistics(this.account_id)
        .subscribe((statistics) => {
          this.monthlyStatistics = statistics;
        });
      this.statisticsService
        .getCategoryStatistics(this.account_id)
        .subscribe((statistics) => {
          this.categoryStatistics = statistics;
        });
    }
  }
}
