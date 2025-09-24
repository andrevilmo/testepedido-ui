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
  public role: string = "operador";
  constructor() {
    const token = localStorage.getItem('authToken'); // Or sessionStorage
    if (token) {
      this._isLoggedIn.next(true);
    }
    
  }

  login(token: string,roleIn:string): Observable<boolean> {
    console.log('LOGIN SAVE');
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', roleIn);
    this.role = roleIn;
    this._isLoggedIn.next(true);
    return this._isLoggedIn.asObservable(); 
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    this._isLoggedIn.next(false);
    return this._isLoggedIn.asObservable(); 
  }
  get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }
}