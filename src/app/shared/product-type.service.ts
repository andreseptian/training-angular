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
export class ProductTypeServive {

  private baseUrl: string = environment.apiUrl + "/product-type";

  constructor(private http: HttpClient, private auth: AuthService) { }

  getProductType(): Observable<any> {
    const url = this.baseUrl; 
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }
}
