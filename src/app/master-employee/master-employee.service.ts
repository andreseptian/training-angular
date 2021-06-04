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
export class MasterEmployeeService {

  private URL: string;
  private employeeUrl : string = environment.apiUrl+'/employees';

  constructor(private http: HttpClient, private auth: AuthService) { }
  
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  getEmployee(jobTitleId: String) {
    this.URL = this.employeeUrl + "/list/" + jobTitleId;

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getName(empId: String) {
    this.URL = this.employeeUrl + "/" + empId;

    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

 getDataEmployeeByJobTitle(jobTitle: string): Observable<any> {
    this.URL = this.employeeUrl + "/master/" + jobTitle;
    
    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  getDataEmployeeByEmpId(empId: string[]): Observable<any> {
    this.URL = this.employeeUrl + "/master/" + empId;
    
    return this.http.get(this.URL).pipe(
      catchError(this.handleError)
    );
  }

   DeleteByEmpId(empId: string): Observable<any> {
    this.URL = this.employeeUrl + "/delete/" + empId;
    
    return this.http.delete(this.URL).pipe(
      catchError(this.handleError)
    );
  }
//belum selesai
  updateEmployee(dataEmp: any[], empId: string): Observable<any> {
    this.URL = this.employeeUrl + "/save/" + empId;
    
    return this.http.save(this.URL).pipe(
      catchError(this.handleError)
    );
  }

}
