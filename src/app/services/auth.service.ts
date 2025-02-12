import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginResponse } from '../interfaces/LoginResponse';
import { RegisterDto } from '../interfaces/Register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//usersgloxideployment-production.up.railway.app

  private apiUrl = 'https://usersgloxideployment-production.up.railway.app/api/Auth';

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getStoredUser()
  );

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.storeLoginResponse(response);
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }

    const payload = this.decodeJwt(token);
    const expiration = payload?.exp ? new Date(payload.exp * 1000) : null;

    if (expiration && expiration > new Date()) {
      return true; 
    }

    this.logout(); 
    return false;
  }

  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    this.currentUserSubject.next(null);
  }

  private storeLoginResponse(response: LoginResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem(
      'authUser',
      JSON.stringify({ email: response.email, roles: response.roles })
    );
    this.currentUserSubject.next({
      email: response.email,
      roles: response.roles,
    });
  }

  private getStoredUser(): User | null {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  }

  register(registerData: RegisterDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
  }
  



}
