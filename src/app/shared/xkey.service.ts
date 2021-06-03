import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class XkeyService {

    URL: string;
    private xkeyUrl = environment.apiUrl + '/xkey';
  
    constructor(private http: HttpClient) { }
  
    private handleError(err: HttpErrorResponse){
      return Observable.throw(err);
    }

    getMasterChannel() {
        this.URL = this.xkeyUrl + '/channel/select-item';
        return this.http.get<SelectItem[]>(this.URL).pipe(
            catchError(this.handleError)
        );
    }

    getMasterActivity() {
        this.URL = this.xkeyUrl + '/activity/select-item';
        return this.http.get<SelectItem[]>(this.URL).pipe(
            catchError(this.handleError)
        );
    }

}