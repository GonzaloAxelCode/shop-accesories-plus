import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/api/auth.service';
import { ROOT_REDUCER } from './state/app.state';
import { checkTokenEffect, loginEffect } from './state/effects/auth.effects';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		LoginComponent,

		CommonModule,
		StoreModule.forRoot(ROOT_REDUCER),
		EffectsModule.forRoot({ loginEffect, checkTokenEffect }),
		TranslateModule.forRoot({
			defaultLanguage: 'en',

		}),
	],

	providers: [AuthService, provideHttpClient(), provideAnimationsAsync()],
	bootstrap: [AppComponent],
})
export class AppModule { }
