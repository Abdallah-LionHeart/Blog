import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './appAccount/login/login.component';
import { DashboardComponent } from './appAdmin/dashboard/dashboard.component';
import { HomeComponent } from './appHome/home/home.component';
import { SharedModule } from './appModule/shared.module';
import { NavbarComponent } from './appNav/navbar.component';
import { ConfirmEmailComponent } from './appAccount/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';




@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule

  ]
})
export class AppModule { }
