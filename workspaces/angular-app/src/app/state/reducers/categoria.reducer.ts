import { Categoria } from '@/app/models/categoria.models';
import { createReducer, on } from '@ngrx/store';
import { createCategoriaAction, createCategoriaFail, createCategoriaSuccess, deleteCategoriaSuccess, loadCategorias, loadCategoriasFail, loadCategoriasSuccess, updateCategoriaSuccess } from '../actions/categoria.actions';



interface CategoriaState {
  categorias: Categoria[];
  loadingCategorias?: boolean;
  errors?: any;
}

export const initialState: CategoriaState = {
  categorias: [],
  loadingCategorias: false,
  errors: {}
};

export const categoriaReducer = createReducer(
  initialState,
  on(loadCategorias, state => ({
    ...state,
    loadingCategorias: true
  })),
  on(loadCategoriasSuccess, (state, { categorias }) => ({
    ...state,
    categorias,
    loadingCategorias: false
  })),
  on(loadCategoriasFail, (state, { error }) => ({
    ...state,
    errors: error,
    loadingCategorias: false
  })),
  on(createCategoriaAction, (state) => ({
    ...state,
    loadingCategorias: true
  })),
  on(createCategoriaSuccess, (state, { categoria }) => ({
    ...state,
    categorias: [...state.categorias, categoria],

    loadingCategorias: false
  })),
  on(createCategoriaFail, (state, { error }) => ({
    ...state,
    errors: error,
    loadingCategorias: false
  })),
  on(updateCategoriaSuccess, (state, { categoria }) => ({
    ...state,
    categorias: state.categorias.map(cat => cat.id === categoria.id ? categoria : cat)
  })),
  on(deleteCategoriaSuccess, (state, { id }) => ({
    ...state,
    categorias: state.categorias.filter(cat => cat.id !== id)
  }))
);
