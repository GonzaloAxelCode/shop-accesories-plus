
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../models/auth.models';
import { CategoriaState } from '../models/categoria.models';
import { authReducer } from './reducers/auth.reducer';
import { categoriaReducer } from './reducers/categoria.reducer';
export interface AppState {
    Auth: AuthState;
    Categoria: CategoriaState;
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
    Auth: authReducer,
    Categoria: categoriaReducer
};