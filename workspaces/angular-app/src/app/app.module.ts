import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/api/auth.service';
import { CategoriaService } from './services/api/categoria.service';
import { AuthInterceptor } from './services/api/http-auth-interceptor';
import { ROOT_REDUCER } from './state/app.state';
import { AuthEffects } from './state/effects/auth.effects';
import { CategoriaEffects } from './state/effects/categoria.effect';

import { provideToastr, ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SidenavComponent } from "./components/sidenav/sidenav.component";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		LoginComponent,
		CommonModule,
		StoreModule.forRoot(ROOT_REDUCER),
		EffectsModule.forRoot([AuthEffects, CategoriaEffects]),
		TranslateModule.forRoot({
			defaultLanguage: 'en',
		}),
		SidenavComponent
	],
	providers: [
		AuthService,
		CategoriaService,
		provideAnimations(),
		provideToastr(),
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
