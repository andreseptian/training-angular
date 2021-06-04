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

}
