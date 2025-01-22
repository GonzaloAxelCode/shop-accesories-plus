
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../models/auth.models';
import { authReducer } from './reducers/auth.reducer';
export interface AppState {
    Auth: AuthState;

}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
    Auth: authReducer,
};