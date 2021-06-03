import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesUtilsService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  private URL: string;
  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  uploadFile(file: File, type ): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.apiUrl + '/upload/'+type+'/' + this.authService.getUser(),
    formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  readFile(file: File, type: string, ap: string): any {
    const url = environment.apiUrl + '/read/' + type + '/?ap=' + ap;
 
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData, { reportProgress: true, responseType: 'json' });
  }

  insertTemp(file: File, tableName: string): any {
    const url = environment.apiUrl + '/insertTemp/' + tableName + '/' + this.authService.getUser();

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData, { reportProgress: true, responseType: 'json' });
  }
}
