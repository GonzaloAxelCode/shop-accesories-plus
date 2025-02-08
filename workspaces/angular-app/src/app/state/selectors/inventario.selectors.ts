import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { InventarioState } from '../reducers/inventario.reducer';

export const selectInventarioState = (state: AppState) => state.Inventario;

export const selectProducto = createSelector(
    selectInventarioState,
    (state: InventarioState) => state
);




