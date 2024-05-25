import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = new BehaviorSubject<boolean>(false);
  constructor() {
    this.autoSignIn();
  }

  autoSignIn() {
    if (typeof window !== 'undefined' && window.localStorage.getItem('userAct57blocks')) {
      this.isAuth.next(true);
    }
  }
}
