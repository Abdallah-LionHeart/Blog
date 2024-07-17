import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../appModels/admin';
import { User } from '../appModels/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  baseUrl = environment.apiUrl + 'account/';
  private currentAdminSubject = new BehaviorSubject<Admin | null>(null);
  currentAdmin$ = this.currentAdminSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  login(model: any) {
    return this.http.post<Admin>(this.baseUrl + 'login', model).pipe(
      map((response: Admin) => {
        const admin = response;
        if (admin) {
          this.setCurrentAdmin(admin);
        }
      })
    )
  }

  confirmLogin(model: any) {
    return this.http.post<Admin>(this.baseUrl + 'confirm-login', model).pipe(
      map((admin: Admin) => {
        if (admin) {
          localStorage.setItem('admin', JSON.stringify(admin));
        }
      })
    )
  }


  logout() {
    localStorage.removeItem('admin');
    this.currentAdminSubject.next(null);
  }

  resendVerificationCode(model: any) {
    return this.http.post(this.baseUrl + 'send-verification-code', model);
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/email-exists?email=' + email);
  }


  setCurrentAdmin(admin: Admin) {
    localStorage.setItem('user', JSON.stringify(admin));
    this.currentAdminSubject.next(admin);
  }

  resetPasswordRequest(model: any) {
    return this.http.post(this.baseUrl + 'reset-password-request', model);
  }

  resetPasswordConfirm(model: any) {
    return this.http.post(this.baseUrl + 'reset-password-confirm', model);
  }


}