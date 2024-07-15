import { NgModule } from '@angular/core';
import { LoginComponent } from './appAccount/login/login.component';
import { ProfileComponent } from './appAccount/profile/profile.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';
import { ArticleFormComponent } from './appArticle/article-form/article-form.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { HomeComponent } from './appHome/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './appNav/nav/nav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
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
