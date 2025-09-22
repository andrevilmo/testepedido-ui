// auth.service.ts
import { Inject,Injectable  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor() {
    // Check for a token in local storag
    // e or session storage on app initialization
    //if (localStorage) {
    //    const token = localStorage.getItem('authToken'); // Or sessionStorage
    //        if (token) {
            // You might want to validate the token with your backend here
            this._isLoggedIn.next(true);
    //        }
    //}
    
  }

  login(token: string) {
    localStorage.setItem('authToken', token);
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    this._isLoggedIn.next(false);
  }

  // Optional: Method to get the current state synchronously
  get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }
}