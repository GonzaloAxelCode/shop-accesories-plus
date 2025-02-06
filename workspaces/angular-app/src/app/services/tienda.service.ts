import { Tienda, TiendaCreate } from '@/app/models/tienda.models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BASE } from './utils/endpoints';

@Injectable({
    providedIn: 'root',
})
export class TiendaService {
    private siteURL = URL_BASE + "/api"
    private http = inject(HttpClient)


    fetchLoadTiendas(): Observable<any> {
        return this.http.get<Tienda[]>(`${this.siteURL}/tiendas/`).pipe(
            catchError(error => throwError(error))
        );
    }

    createTienda(tienda: TiendaCreate): Observable<Tienda> {
        return this.http.post<Tienda>(`${this.siteURL}/tiendas/create/`, tienda).pipe(
            catchError(error => {
                console.log(error)
                return throwError(error)
            })
        );
    }
    desactivateTienda({ id, activo }: { id: number, activo: boolean }): Observable<any> {
        return this.http.patch(`${this.siteURL}/tiendas/desactivate/${id}/`, { activo }).pipe(
            catchError(error => {
                console.log(error)
                return throwError(error)
            })
        );
    }



}

