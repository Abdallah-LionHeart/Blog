import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'acount/login', { email, password });
  }

  confirmLogin(email: string, password: string, code: string) {
    return this.http.post(this.baseUrl + 'account/confirm-login', { email, password, code });
  }

  resetPasswordRequest(email: string) {
    return this.http.post(this.baseUrl + 'account/reset-password-request', { email });
  }

  resetPasswordConfirm(email: string, code: string, newPassword: string) {
    return this.http.post(this.baseUrl + 'account/reset-password-confirm', { email, code, newPassword });
  }

}