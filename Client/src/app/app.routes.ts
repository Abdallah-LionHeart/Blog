import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './appAccount/login/login.component';
import { HomeComponent } from './appHome/home/home.component';
import { NavbarComponent } from './appNav/navbar.component';

export const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: 'nav', component: NavbarComponent },
 { path: 'home', component: HomeComponent },

];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }

