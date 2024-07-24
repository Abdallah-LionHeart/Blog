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
import { ArticleCreateComponent } from './appArticle/article-create/article-create.component';
import { ArticleDetailsComponent } from './appArticle/article-details/article-details.component';
import { ArticleEditComponent } from './appArticle/article-edit/article-edit.component';
import { ArticleEventComponent } from './appArticle/article-event/article-event.component';
import { ArticleFormComponent } from './appArticle/article-form/article-form.component';
import { ArticleListComponent } from './appArticle/article-list/article-list.component';
import { ArticleSearchComponent } from './appArticle/article-search/article-search.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { HomeComponent } from './appHome/home/home.component';
import { MainProfileComponent } from './appMain/main-profile/main-profile.component';
import { ConfirmDialogComponent } from './appModals/confirm-dialog/confirm-dialog.component';
import { SharedModule } from './appModule/shared.module';
import { NavComponent } from './appNav/nav/nav.component';
import { BackgroundImagesComponent } from './appProfile/background-images/background-images.component';
import { ProfileImagesComponent } from './appProfile/profile-images/profile-images.component';
import { ProfileComponent } from './appProfile/profile/profile.component';
import { UserManagementComponent } from './appProfile/user-management/user-management.component';
import { HeaderComponent } from './appSection/header/header.component';
import { SectionHeaderComponent } from './appSection/section-header/section-header.component';
import {MatButtonModule} from '@angular/material/button';
import { ImageCarouselComponent } from './appMain/main-profile/image-carousel/image-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticalItemComponent } from './appArticle/article-list/artical-item/artical-item.component';
import { SafePipe } from './pipes/safe.pipe';
import { PaginationItemComponent } from './appArticle/article-list/pagination-item/pagination-item.component';
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
    ArticleCreateComponent,
    ArticleListComponent,
    ArticleSearchComponent,
    ArticleEventComponent,
    ArticleDetailsComponent,
    ArticleEditComponent,
    ConfirmDialogComponent,
    MainProfileComponent,
    HeaderComponent,
    SectionHeaderComponent,
    ImageCarouselComponent,
      FooterComponent,
      ArticalItemComponent,
      SafePipe,
      PaginationItemComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
