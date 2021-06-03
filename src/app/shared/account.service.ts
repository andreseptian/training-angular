import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/primeng';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = environment.apiUrl + '/accounts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  getAccounts() {
    const url = this.accountUrl;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteAccount(accountId: string) {
    const url = this.accountUrl + "/?accountId=" + accountId;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  insertAccount(dataAccount: any) {
    const url = this.accountUrl; 
    return this.http.post(url, dataAccount).pipe(
      catchError(this.handleError)
    );
  }

  updateAccount(dataAccount: any) {
    const url = this.accountUrl;
    return this.http.put(url, dataAccount).pipe(
      catchError(this.handleError)
    );
  }

  findAccountAsSelectItemByUser() {
    const url = this.accountUrl + '/select-item?user=' + this.authService.getUser();
    return this.http.get<SelectItem[]>(url).pipe( 
      catchError(this.handleError)
    );
  }

  findAccountAsSelectItem() {
    const url = this.accountUrl + '/select-item';
    return this.http.get<SelectItem[]>(url).pipe( 
      catchError(this.handleError)
    );
  }

  getNumberPlan(yearFrom: number, yearTo: number, periodFrom: number, periodTo: number, selectedAccount: number){
    const url = this.accountUrl + '/' + selectedAccount + '/plan-activities/select-item'+ '?year-from='+ yearFrom + '&year-to='+ yearTo +
    '&period-from='+ periodFrom +'&period-to='+ periodTo ;
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }
}
