import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { CategoriaService } from '@/app/services/api/categoria.service';
import {
    createCategoriaAction, createCategoriaFail, createCategoriaSuccess,
    deleteCategoria, deleteCategoriaFail, deleteCategoriaSuccess,
    loadCategorias, loadCategoriasFail, loadCategoriasSuccess,
    updateCategoria, updateCategoriaFail, updateCategoriaSuccess
} from '../actions/categoria.actions';
import { AppState } from '../app.state';

@Injectable()
export class CategoriaEffects {

    constructor(
        private actions$: Actions,
        private categoriaService: CategoriaService,
        private store: Store<AppState>
    ) { }

    loadCategoriasEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategorias),
            exhaustMap(() =>
                this.categoriaService.fetchCategorias().pipe(
                    map(categorias => loadCategoriasSuccess({ categorias })),
                    catchError(error => of(loadCategoriasFail({ error })))
                )
            )
        )
    );

    createCategoriaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(createCategoriaAction),
            exhaustMap(({ categoria }) =>
                this.categoriaService.createCategoria(categoria).pipe(
                    map(createdCategoria => createCategoriaSuccess({ categoria: createdCategoria })),
                    catchError(error => of(createCategoriaFail({ error })))
                )
            )
        )
    );

    updateCategoriaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategoria),
            exhaustMap(({ categoria }) =>
                this.categoriaService.updateCategoria(categoria).pipe(
                    map(updatedCategoria => updateCategoriaSuccess({ categoria: updatedCategoria })),
                    catchError(error => of(updateCategoriaFail({ error })))
                )
            )
        )
    );

    deleteCategoriaEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategoria),
            exhaustMap(({ id }) =>
                this.categoriaService.deleteCategoria(id).pipe(
                    map(() => deleteCategoriaSuccess({ id })),
                    catchError(error => of(deleteCategoriaFail({ error })))
                )
            )
        )
    );
}
