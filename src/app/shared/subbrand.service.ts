import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubbrandService {

  private subbrandUrl = environment.apiUrl + '/subbrands';

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  findSubbrandAsSelectItem(){
    let url = this.subbrandUrl + "/select-item";
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }

  findParentAsSelectItemBySubbrand(subbrands) {
    let url = this.subbrandUrl + '/' + subbrands + '/parent/select-item';
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  findParentExcludedAsSelectItemBySubbrand(subbrands, snop) {
    let url = this.subbrandUrl + '/' + subbrands + '/excludedParent/' + snop + '/select-item';
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    );
  }

}
