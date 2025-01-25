import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent,
		canActivate: [authGuard],

	},

];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
