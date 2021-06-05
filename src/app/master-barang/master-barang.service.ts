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
export class MasterBarangService {
   private URL: string;
  private employeeUrl : string = environment.apiUrl+'/barang';

  constructor(
    private http: HttpClient, private auth: AuthService
  ) {
    
  }
  
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  getAllBarang(): Observable<any>{
    this.URL = this.employeeUrl + "/getAllBarang";

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  deleteBarangByPcode(pcode: string): Observable<any>{
    this.URL = this.employeeUrl + "/delete/"+pcode;

    return this.http.delete(this.URL).pipe(
      catchError(this.handleError)
    );
  }


  insertBarang(pcode: string, pcode_name:string, price: string, stock: string): Observable<any>{
    this.URL = this.employeeUrl + "/insert?pcode=" + pcode + "&pcodeName=" + pcode_name + "&price=" + price + "&stock=" + stock;

    return this.http.post(this.URL, pcode).pipe(
      catchError(this.handleError)
    );
  }

  updateBarang(dataBrg: any[]): Observable<any>{
    this.URL = this.employeeUrl + "/updateAll";

    return this.http.put(this.URL, dataBrg).pipe(
      catchError(this.handleError)
    );
  }

}
