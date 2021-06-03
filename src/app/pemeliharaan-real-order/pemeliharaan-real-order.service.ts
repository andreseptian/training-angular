import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PemeliharaanRealOrderService {

  private URL: string;
  private pemRealOrderUrl : string = environment.apiUrl+'/sales-management/real-order';
  private salesUrl : string = environment.apiUrl+'/sales-management/salesman';

  constructor(private http: HttpClient, private auth: AuthService) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  getUpdModuleDate(){
    this.URL = this.pemRealOrderUrl + "/upd-module";
    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getListSalesman(): Observable<any>{
    this.URL = this.salesUrl + "/select-items";
    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getDataSalesmanChoosen(salesman: string): Observable<any>{
    this.URL = this.salesUrl + "/"+salesman+"/choosen";

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getListOrderBySalesman(salesman: string): Observable<any>{
    this.URL = this.pemRealOrderUrl + "/select-item/salesman/"+salesman;

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getRealOrder(orderno: string): Observable<any>{
    this.URL = this.pemRealOrderUrl + "/"+orderno;

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getDetailRealOrder(orderno: string, salesman: string): Observable<any>{
    this.URL = this.pemRealOrderUrl + "/detail/"+orderno+"/"+salesman;

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

}
