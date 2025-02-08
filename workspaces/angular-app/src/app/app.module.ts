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
import { AuthService } from './services/auth.service';
import { CategoriaService } from './services/categoria.service';
import { AuthInterceptor } from './services/utils/http-auth-interceptor';
import { ROOT_REDUCER } from './state/app.state';
import { AuthEffects } from './state/effects/auth.effects';
import { CategoriaEffects } from './state/effects/categoria.effect';

import { provideToastr, ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { InventarioService } from './services/inventario.service';
import { ProductoService } from './services/producto.service';
import { ProveedorService } from './services/proveedor.service';
import { TiendaService } from './services/tienda.service';
import { UserService } from './services/user.service';
import { InventarioEffects } from './state/effects/inventario.effects';
import { ProductoEffects } from './state/effects/producto.effects';
import { ProveedorEffects } from './state/effects/proveedor.effects';
import { TiendaEffects } from './state/effects/tienda.effects';
import { UserEffects } from './state/effects/user.effects';

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
		EffectsModule.forRoot([
			AuthEffects,
			CategoriaEffects,
			TiendaEffects,
			UserEffects,
			ProductoEffects,
			InventarioEffects,
			ProveedorEffects
		]),
		TranslateModule.forRoot({
			defaultLanguage: 'en',
		}),
		SidenavComponent
	],
	providers: [
		AuthService,
		CategoriaService,
		TiendaService,
		UserService,
		ProductoService,
		InventarioService,
		ProveedorService,
		provideAnimations(),
		provideToastr(),
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
