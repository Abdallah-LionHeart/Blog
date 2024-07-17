import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmLoginComponent } from './appAccount/confirm-login/confirm-login.component';
import { LoginComponent } from './appAccount/login/login.component';
import { PhotoEditorComponent } from './appAccount/photo-editor/photo-editor.component';
import { ResetPasswordConfirmComponent } from './appAccount/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';
import { ArticleFormComponent } from './appArticle/article-form/article-form.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { HomeComponent } from './appHome/home/home.component';
import { NavComponent } from './appNav/nav/nav.component';
import { ProfileComponent } from './appProfile/profile/profile.component';
import { UserManagementComponent } from './appProfile/user-management/user-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'confirm-login', component: ConfirmLoginComponent },
  { path: 'reset-password-request', component: ResetPasswordComponent },
  { path: 'reset-password-confirm', component: ResetPasswordConfirmComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'photo-editor', component: PhotoEditorComponent },

  { path: 'articles', component: ArticleComponent },
  { path: 'articles/new', component: ArticleFormComponent },
  { path: 'articles/edit/:id', component: ArticleFormComponent },
  { path: 'nav', component: NavComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
