import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './appAccount/login/login.component';
import { ResetPasswordConfirmComponent } from './appAccount/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordComponent } from './appAccount/reset-password/reset-password.component';
import { ArticleCreateComponent } from './appArticle/article-create/article-create.component';
import { ArticleDetailsComponent } from './appArticle/article-details/article-details.component';
import { ArticleEditComponent } from './appArticle/article-edit/article-edit.component';
import { ArticleEventComponent } from './appArticle/article-event/article-event.component';
import { ArticleListComponent } from './appArticle/article-list/article-list.component';
import { ArticleSearchComponent } from './appArticle/article-search/article-search.component';
import { ArticleComponent } from './appArticle/article/article.component';
import { preventUnsavedChangesGuard } from './appGuard/prevent-unsaved-changes.guard';
import { HomeComponent } from './appHome/home/home.component';
import { AboutComponent } from './appMain/about/about.component';
import { MainProfileComponent } from './appMain/main-profile/main-profile.component';
import { NavComponent } from './appNav/nav/nav.component';
import { ProfileComponent } from './appProfile/profile/profile.component';
import { UserManagementComponent } from './appProfile/user-management/user-management.component';

const routes: Routes = [

  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password-request', component: ResetPasswordComponent },
  { path: 'reset-password-confirm', component: ResetPasswordConfirmComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/detail/:id', component: ArticleDetailsComponent, data: { breadcrumb: { alias: 'ArticleDetailsComponent' } } },
  { path: 'articles/edit/:id', component: ArticleEditComponent, canDeactivate: [preventUnsavedChangesGuard] },
  { path: 'search', component: ArticleSearchComponent },
  { path: 'event', component: ArticleEventComponent },
  { path: 'create', component: ArticleCreateComponent },

  { path: 'main', component: MainProfileComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'nav', component: NavComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
