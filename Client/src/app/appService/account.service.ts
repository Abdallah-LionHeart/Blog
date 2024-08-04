import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../appModels/userDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  baseUrl = environment.apiUrl + 'account/';
  loginUrl = 'https://localhost:5001/api/account/login';
  private currentUserSource = new BehaviorSubject<UserDto | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
  }


  login(model: any) {
    return this.http.post<UserDto>(this.loginUrl, model).pipe(
      map((response: UserDto) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: UserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  resendVerificationCode(model: any) {
    return this.http.post(this.baseUrl + 'send-verification-code', model);
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'email-exists?email=' + email);
  }


  resetPasswordRequest(model: any) {
    return this.http.post(this.baseUrl + 'reset-password-request', model);
  }

  resetPasswordConfirm(model: any) {
    return this.http.post(this.baseUrl + 'reset-password-confirm', model);
  }


}