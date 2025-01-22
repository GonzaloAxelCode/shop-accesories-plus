import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
		StoreModule.forRoot(ROOT_REDUCER),
		EffectsModule.forRoot({ loginEffect, checkTokenEffect }),
		TranslateModule.forRoot({
			defaultLanguage: 'en',

		}),
	],

	providers: [AuthService],

	bootstrap: [AppComponent],
})
export class AppModule { }
