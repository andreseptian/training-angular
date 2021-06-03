import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DivisionsService {

  url: string;
  private divisionsUrl = environment.apiUrl + '/divisi';
  
  constructor(private http: HttpClient) { }
  
  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  getMasterDivisi(){
    this.url = this.divisionsUrl + "/select-item" ;
    return this.http.get(this.url).pipe(
      catchError(this.handleError));
  }
  getGroupDivisi(){
    this.url = this.divisionsUrl + "/GetDivisi" ;
    return this.http.get(this.url).pipe(
      catchError(this.handleError));
  }
}
