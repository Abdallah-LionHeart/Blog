import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmEmailComponent } from './appAccount/confirm-email/confirm-email.component';
import { LoginComponent } from './appAccount/login/login.component';
import { PhotoEditorComponent } from './appAccount/photo-editor/photo-editor.component';
import { ProfileComponent } from './appAccount/profile/profile.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';
import { DashborardComponent } from './appAdmin/dashborard/dashborard.component';
import { ArticleFormComponent } from './appArticle/article-form/article-form.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { HomeComponent } from './appHome/home/home.component';
import { SharedModule } from './appModule/shared.module';
import { NavComponent } from './appNav/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmEmailComponent,
    LoginComponent,
    PhotoEditorComponent,
    ProfileComponent,
    ResetPasswordComponent,
    DashborardComponent,
    ArticleComponent,
    ArticleFormComponent,
    HomeComponent,
    NavComponent
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
