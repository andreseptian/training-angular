import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUser() {
    // return '12963';
    return 'DEV01';
  }
}
