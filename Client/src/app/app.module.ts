import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmLoginComponent } from './appAccount/confirm-login/confirm-login.component';
import { LoginComponent } from './appAccount/login/login.component';
import { ResetPasswordConfirmComponent } from './appAccount/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';
import { DashborardComponent } from './appAdmin/dashborard/dashborard.component';
import { ArticleFormComponent } from './appArticle/article-form/article-form.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { HomeComponent } from './appHome/home/home.component';
import { SharedModule } from './appModule/shared.module';
import { NavComponent } from './appNav/nav/nav.component';
import { BackgroundImagesComponent } from './appProfile/background-images/background-images.component';
import { ProfileImagesComponent } from './appProfile/profile-images/profile-images.component';
import { ProfileComponent } from './appProfile/profile/profile.component';
import { UserManagementComponent } from './appProfile/user-management/user-management.component';
import { CreateArticleComponent } from './appArticle/create-article/create-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ResetPasswordComponent,
    DashborardComponent,
    ArticleComponent,
    ArticleFormComponent,
    HomeComponent,
    NavComponent,
    ResetPasswordConfirmComponent,
    UserManagementComponent,
    ProfileImagesComponent,
    BackgroundImagesComponent,
    ConfirmLoginComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
