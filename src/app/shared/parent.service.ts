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
export class ParentService {

  url: string;
  private parentUrl = environment.apiUrl + '/parents';

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.message);
  }

  /* Get all master parent on select item */
  getMasterParent() {
    this.url = this.parentUrl + '/select-item';
    return this.http.get<SelectItem[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getSkuByParent(parents) {
    this.url = this.parentUrl + '/' + parents + '/sku/select-item';
    return this.http.get<SelectItem[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

}
