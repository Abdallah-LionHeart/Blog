import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './appAccount/login/login.component';
import { ResetPasswordConfirmComponent } from './appAccount/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';
import { DashborardComponent } from './appAdmin/dashborard/dashborard.component';
import { ArticleCardsComponent } from './appArticle/article-cards/article-cards.component';
import { ArticleCreateComponent } from './appArticle/article-create/article-create.component';
import { ArticleDetailsComponent } from './appArticle/article-details/article-details.component';
import { ArticleEditComponent } from './appArticle/article-edit/article-edit.component';
import { ArticleEventComponent } from './appArticle/article-event/article-event.component';
import { ArticleListComponent } from './appArticle/article-list/article-list.component';
import { ArticlePagingComponent } from './appArticle/article-paging/article-paging.component';
import { ArticleSearchComponent } from './appArticle/article-search/article-search.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { HomeComponent } from './appHome/home/home.component';
import { JwtInterceptor } from './appInterceptors/jwt.interceptor';
import { LoadingInterceptor } from './appInterceptors/loading.interceptor';
import { AboutComponent } from './appMain/about/about.component';
import { ImageCarouselComponent } from './appMain/image-carousel/image-carousel.component';
import { MainProfileComponent } from './appMain/main-profile/main-profile.component';
import { ConfirmDialogComponent } from './appModals/confirm-dialog/confirm-dialog.component';
import { SharedModule } from './appModule/shared.module';
import { NavComponent } from './appNav/nav/nav.component';
import { BackgroundImagesComponent } from './appProfile/background-images/background-images.component';
import { ProfileImagesComponent } from './appProfile/profile-images/profile-images.component';
import { ProfileComponent } from './appProfile/profile/profile.component';
import { UserManagementComponent } from './appProfile/user-management/user-management.component';
import { FooterComponent } from './appSection/footer/footer.component';
import { HeaderComponent } from './appSection/header/header.component';
import { SectionHeaderComponent } from './appSection/section-header/section-header.component';
import { SafePipe } from './pipes/safe.pipe';
import { NavbarComponent } from './appRoot/navbar/navbar.component';
import { SideNavComponent } from './appRoot/side-nav/side-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ResetPasswordComponent,
    DashborardComponent,
    ArticleComponent,
    HomeComponent,
    NavComponent,
    ResetPasswordConfirmComponent,
    UserManagementComponent,
    ProfileImagesComponent,
    BackgroundImagesComponent,
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
    SafePipe,
    AboutComponent,
    ArticleCardsComponent,
    ArticlePagingComponent,
    NavbarComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
