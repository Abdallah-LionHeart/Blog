import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['your-api-url'], // Replace with your API domain
        disallowedRoutes: ['your-api-url/api/auth/login'] // Replace with your login API endpoint
      }
    })
  ]
})
export class SharedModule { }
