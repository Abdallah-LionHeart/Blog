import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(this.baseUrl, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
        }),
        catchError(() => of(false))
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/admin-portal-xyz']);
  }
}