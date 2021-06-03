import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { AppModule } from '../app.module';


@Injectable({ providedIn: 'root' })
export class GroupActivityService {

  private baseUrl: string = environment.apiUrl + "/group-activity";

  constructor(private http: HttpClient, private auth: AuthService) { }

  getActivityByGroup(group: string): Observable<any> {
    const url = this.baseUrl + "/" + group + "/activity";
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getGroup(): Observable<any> {
    const url = this.baseUrl; 
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }
}
