import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  url: string;
  private channelUrl = environment.apiUrl + '/channels';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  /* Get all master channel on select item */
  getMasterChannel() {
    this.url = this.channelUrl + '/select-item';
    return this.http.get<SelectItem[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  /* Get master account by channel-id on select item */
  getMasterAcountsByChannel(channelId) {
    this.url = this.channelUrl + '/' + channelId + '/accounts/select-item?user=' + this.authService.getUser();
    return this.http.get<SelectItem[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

}
