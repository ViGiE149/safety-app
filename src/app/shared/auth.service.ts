import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;

  constructor() { }
  getCurrentUser(): Observable<any> {
    return this.user$;
  }
}
