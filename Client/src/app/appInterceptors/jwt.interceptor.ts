import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from '../appService/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accountService.currentAdmin$.pipe(take(1)).subscribe({
      next: admin => {
        if (admin) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${admin.token}`
            }
          })
        }
      }
    })

    return next.handle(request);
  }
}