import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class UtilService {
  URL: string;
  private cycleUrl = environment.apiUrl;
  private utilUrl = environment.apiUrl + '/util';
  private accuralUrl = environment.apiUrl + '/accrual';

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse){
    return Observable.throw(err);
  }

  getYears(): SelectItem[]{
    let years: SelectItem[] = [];
    let currentYear = new Date().getFullYear();
    let startYear = 2016;

    while (startYear <= currentYear) {
      startYear++;
      years.push({label: startYear.toString(), value: startYear});
    }
    return years;
  }

  getPeriods(): SelectItem[]{
    let periods: SelectItem[] = [];
    let startPeriod = 0;

    while (startPeriod <= 11) {
      startPeriod++;
      periods.push({label: startPeriod.toString(), value: startPeriod});
    }
    return periods;
  }

  getPeriodsByName(): SelectItem[]{
    let periods: SelectItem[] = [];
    let startPeriod = 0;

    while (startPeriod <= 11) {
      startPeriod++;
      periods.push({label: this.getConvNumberToPeriod(startPeriod), value: startPeriod});
    }
    return periods;
  }

  getWeekNow() {
    this.URL =  this.cycleUrl + '/m-cycle3/weekNow';
    return this.http.get<number>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getPeriodNow() {
    this.URL =  this.cycleUrl + '/m-cycle3/periodNow';
    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getPeriodCycle() {
    this.URL =  this.cycleUrl + '/m-cycle3/periodsCycle';
    return this.http.get<SelectItem[]>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getYearNow() {
    this.URL =  this.cycleUrl + '/m-cycle3/yearNow';
    return this.http.get<number>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getConvNumberToPeriod(periode: number){
    let periodName: string;
    if (periode === 1) {
      periodName = 'Jan';
    }

    if (periode === 2) {
      periodName = 'Feb';
    }

    if (periode === 3) {
      periodName = 'Mar';
    }

    if (periode === 4) {
      periodName = 'Apr';
    }

    if (periode === 5) {
      periodName = 'May';
    }

    if (periode === 6) {
      periodName = 'Jun';
    }

    if (periode === 7) {
      periodName = 'Jul';
    }

    if (periode === 8) {
      periodName = 'Aug';
    }

    if (periode === 9) {
      periodName = 'Sep';
    }

    if (periode === 10) {
      periodName = 'Oct';
    }

    if(periode === 11) {
      periodName = 'Nov';
    }

    if(periode == 12) {
      periodName = 'Dec';
    }

    return periodName;
  }

  cvtNumToFmtThsnd( value: number): string{
    if (value == null){
      value = 0;
    } else {
      value = Math.round(value * 100) / 100;
    }
    var parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  getPeriodFullName(periode: number){
    let periodName: string;
    
    if(periode == 1){
      periodName = 'JANUARY';
    }

    if(periode == 2){
      periodName = 'FEBRUARY';
    }

    if(periode == 3){
      periodName = 'MARCH';
    }

    if(periode == 4){
      periodName = 'APRIL';
    }

    if(periode == 5){
      periodName = 'MAY';
    }

    if(periode == 6){
      periodName = 'JUNE';
    }
    
    if(periode == 7){
      periodName = 'JULY';
    }

    if(periode == 8){
      periodName = 'AUGUST';
    }

    if(periode == 9){
      periodName = 'SEPTEMBER';
    }

    if(periode == 10){
      periodName = 'OCTOBER';
    }

    if(periode == 11){
      periodName = 'NOVEMBER';
    }

    if(periode == 12){
      periodName = 'DECEMBER';
    }

    return periodName;
  }

  getNextPeriod(periode: number): string{
    if(periode < 12){
      periode += 1;
    }else{
      periode = 1;
    }

    return this.getPeriodFullName(periode);
  }

  ListCheck(listTmp: string[], data: string) {
    let counter = 0;
    for (let i = 0; i < listTmp.length; i++) {
      if (listTmp[i] == data) {
        counter += 1;
      }
    }
    if (counter == 0) {
      listTmp.push(data);
    }
  }

  getOwnerAp(): SelectItem[]{
    const ownerAp: SelectItem[] = [];
    ownerAp.push({label: '-', value: '0'});
    ownerAp.push({label: 'MT', value: '1'});
    ownerAp.push({label: 'Marketing', value: '2'});
    ownerAp.push({label: 'MT+Marketing', value: '3'});
    return ownerAp;
  }

  getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  getMaxLength(tableNm, columnNm) {
    this.URL = this.utilUrl + '/length/' + tableNm + '/' + columnNm;

    return this.http.get<number>(this.URL).pipe(
      catchError(this.handleError)
    );

  }

  insertAccrual(snop) {
    this.URL = this.accuralUrl + '?snop=' + snop;
    return this.http.post(this.URL, []).pipe(
      catchError(this.handleError)
    );
  }

  deleteAccrual(snop) {
    this.URL = this.accuralUrl + '?snop=' + snop;
    return this.http.delete(this.URL).pipe(
      catchError(this.handleError)
    );
  }

}
