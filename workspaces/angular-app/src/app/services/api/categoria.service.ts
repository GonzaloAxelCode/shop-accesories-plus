import { Categoria, CategoriaCreate } from '@/app/models/categoria.models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BASE } from './endpoints';


@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private siteURL = URL_BASE + "/api"
  private http = inject(HttpClient)


  fetchCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.siteURL}/categorias`).pipe(
      catchError(error => throwError(error))
    );
  }

  createCategoria(categoria: CategoriaCreate): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.siteURL}/categorias/create/`, categoria).pipe(
      catchError(error => throwError(error))
    );
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.siteURL}/categorias/${categoria.id}`, categoria).pipe(
      catchError(error => throwError(error))
    );
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.siteURL}/categorias/${id}`).pipe(
      catchError(error => throwError(error))
    );
  }
}

