import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NotificationService {
  message: Message[] = [];

  constructor() { }

  success(detail: string, summary?: string){
    this.message = [{severity:'success', summary: summary, detail: detail}];
  }

  info(detail: string, summary?: string){
    this.message = [{severity:'info', summary: summary, detail: detail}];
  }

  warning(detail: string, summary?: string){
    this.message = [{severity:'warning', summary: summary, detail: detail}];
  }

  error(detail: string, summary?: string){
    this.message = [{severity:'error', summary: summary, detail: detail}];    
  }

  console(detail: any){
    console.log(detail);
  }

  destroy(){
    this.message = [];
  }

}
