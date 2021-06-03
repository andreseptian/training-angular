import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private divUrl = environment.apiUrl + '/divisi';

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  findBrandAsSelectItemByDiv(division){
    let url = this.divUrl + '/' + division + '/brands/select-item';
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }

  findDivisiAsSelectItem(){
    let url = this.divUrl + '/select-item';
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  findGroupDivisiAsSelectItem(){
    let url = this.divUrl + '/getGroupDivisi';
    return this.http.get<SelectItem[]>(url).pipe(
      catchError(this.handleError)
    )
  }

}
