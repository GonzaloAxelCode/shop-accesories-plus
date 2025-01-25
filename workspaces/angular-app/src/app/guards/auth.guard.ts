import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import { selectAuth } from '../state/selectors/auth.selectors';



export const authGuard = (): Observable<boolean> => {
    const store = inject(Store<AppState>);
    const router = inject(Router);

    return store.select(selectAuth).pipe(
        map((authState) => {
            if (authState.isAuthenticated) {

                router.navigate(['/']);
                return true;
            } else {
                router.navigate(['/login']);
                return false;
            }
        })
    );
};
