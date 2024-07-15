import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ['your-api-url'], // Replace with your API domain
    //     disallowedRoutes: ['your-api-url/api/auth/login'] // Replace with your login API endpoint
    //   }
    // })

  ]
})
export class SharedModule { }
