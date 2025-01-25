import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	OnInit,
	Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../models/auth.models';
import { loginInAction } from '../state/actions/auth.actions';
import { selectAuth } from '../state/selectors/auth.selectors';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	@Output() eventClickChangeTab = new EventEmitter<number>();
	onClickRedirectLogin(): void {
		this.eventClickChangeTab.emit(1);
	}
	private store = inject(Store<any>);
	private router = inject(Router);

	authState$: Observable<AuthState> = this.store.pipe(select(selectAuth));
	isAuthSuccess: boolean = false;
	errors: any;
	isLoading: boolean = false
	readonly passwordFormControl = new FormControl('', Validators.required);
	readonly usernameFormControl = new FormControl('', [
		Validators.required,

	]);

	loginForm = new FormGroup({
		username: this.usernameFormControl,
		password: this.passwordFormControl,
	});

	ngOnInit(): void {
		this.authState$.subscribe((authState) => {
			if (authState.errors) {
				this.errors = authState.errors;
				console.log(this.errors)
			}
		});
	}

	onSubmit(): void {

		if (this.loginForm.valid) {

			const formData: any = this.loginForm.value;

			this.store.dispatch(loginInAction(formData));

			this.authState$.subscribe((authState) => {
				if (authState.isAuthenticated) {
					console.log(authState.isAuthenticated)
					this.isLoading = authState.isLoadingLogin

				}

			});
		}
	}

	isFormValid(): boolean {
		return this.loginForm.valid;
	}
}