import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OptionCalendar } from './option-calendar';
import { EventCalendar } from './event-calendar';
import { EventDetailCalendar } from './event-detail-calendar';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url : string;
  private activityUrl = environment.apiUrl + '/activity'

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

  getMasterActivity(){
    this.url = this.activityUrl + "/select-item" ;
    return this.http.get<SelectItem[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getActivityAsSelectItemByFlag(flag){
    this.url = this.activityUrl + "/select-item/" + flag ;
    return this.http.get<SelectItem[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getEventDetailCalendar(noPlan, color){
    this.url = this.activityUrl + "/events/detail" + "?no-plan=" + noPlan + "&color=" + color;
    return this.http.get<EventDetailCalendar>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getEventCalendar(account, yearFrom, yearTo, periodFrom, periodTo, noPlan, ownerap, type, namatype, activity){
    this.url = this.activityUrl + "/events" + "?account=" + account + "&year-from=" +  yearFrom + "&year-to=" + yearTo + "&period-from=" + periodFrom + "&period-to=" + periodTo + "&no-plan=" + noPlan + "&owner-ap=" + ownerap + "&type=" + type +"&nm-type=" + namatype + "&activity=" + activity;
    return this.http.get<EventCalendar[]>(this.url).pipe( 
      catchError(this.handleError)
    );
  }

  getOptionCalendar(account, yearFrom, yearTo, periodFrom, periodTo){
    this.url = this.activityUrl + "/events/options" + "?account=" + account + "&year-from=" +  yearFrom + "&year-to=" + yearTo + "&period-from=" + periodFrom + "&period-to=" + periodTo ;
    return this.http.get<OptionCalendar[]>(this.url).pipe(
      catchError(this.handleError)
    );  
  }
}
