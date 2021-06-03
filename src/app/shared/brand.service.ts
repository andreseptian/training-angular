import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private brandUrl = environment.apiUrl + '/brands';

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  findBrandAsSelectItem(){
    let url = this.brandUrl + "/select-item";
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }

  findSubbrandAsSelectItemByBrand(brands){
    let url = this.brandUrl + '/' + brands + '/subbrands/select-item';
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }

}
