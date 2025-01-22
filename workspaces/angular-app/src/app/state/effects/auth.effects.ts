import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { AuthService } from '@/app/services/api/auth.service';
import { saveTokensToLocalStorage } from '@/app/services/localstorage/notification.service';
import {
    checkTokenAction,
    checkTokenActionFail,
    checkTokenActionSuccess,
    loginInAction,
    loginInActionFail,
    loginInActionSuccess
} from '../actions/auth.actions';
import { AppState } from '../app.state';

export const loginEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), _store = inject(Store<AppState>)) => {
        return actions$.pipe(
            ofType(loginInAction),
            exhaustMap(({ email, password }) =>
                authService.fetchCreateToken({ email, password }).pipe(
                    map((response: any) => {
                        if (response.isSuccess) {
                            saveTokensToLocalStorage({
                                accessToken: response.data?.access,
                                refreshToken: response.data?.refresh,
                            });

                            return loginInActionSuccess({
                                refreshToken: response.data?.refresh,
                                accessToken: response.data?.access,
                                isAuthenticated: true,
                                isLoadingLogin: false,
                                isLoadingLogout: false,
                            });
                        } else {
                            return loginInActionFail({
                                refreshToken: '',
                                accessToken: '',
                                isAuthenticated: false,
                                errors: response?.error?.detail?.error,
                                isLoadingLogin: false,
                                isLoadingLogout: false,
                            });
                        }
                    }),
                    catchError((error) =>
                        of(
                            loginInActionFail({
                                refreshToken: '',
                                accessToken: '',
                                isAuthenticated: false,
                                errors: error?.error,
                                isLoadingLogin: false,
                                isLoadingLogout: false,
                            })
                        )
                    )
                )
            )
        );
    },
    { functional: true }
);

export const checkTokenEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), _store = inject(Store<AppState>)) => {
        return actions$.pipe(
            ofType(checkTokenAction),
            exhaustMap(() =>
                authService.fetchCheckAuthenticated().pipe(
                    map((response: any) =>
                        response.isSuccess ? checkTokenActionSuccess() : checkTokenActionFail()
                    ),
                    catchError(() =>
                        of(checkTokenActionFail())
                    )
                )
            )
        );
    },
    { functional: true }
);
