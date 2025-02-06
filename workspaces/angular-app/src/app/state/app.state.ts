
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../models/auth.models';
import { CategoriaState } from '../models/categoria.models';
import { TiendaState } from '../models/tienda.models';
import { authReducer } from './reducers/auth.reducer';
import { categoriaReducer } from './reducers/categoria.reducer';
import { tiendaReducer } from './reducers/tienda.reducer';
import { userReducer, UserState } from './reducers/user.reducer';

export interface AppState {
    Auth: AuthState;
    Categoria: CategoriaState;
    Tienda: TiendaState;
    User: UserState;
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
    Auth: authReducer,
    Categoria: categoriaReducer,
    Tienda: tiendaReducer,
    User: userReducer
};