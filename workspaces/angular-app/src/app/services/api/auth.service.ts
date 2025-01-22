import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



import { Tokens, UserAuth } from '@/app/models/auth.models';

import { getTokensFromLocalStorage } from '../localstorage/notification.service';
import { URL_BASE } from './endpoints';

interface ResponseServiceState {
  errors: any;
  data: any;
  isSuccess: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private siteURL = URL_BASE;

  constructor(private http: HttpClient) { }

  fetchCreateToken(userAuth: UserAuth): Observable<ResponseServiceState> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<Tokens>(`${this.siteURL}/auth/jwt/create/`, userAuth, {
        headers,
        observe: 'response',
      })

      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        map((response: HttpResponse<any>) => {
          return response.status === 200 ? {
            errors: {},
            data: response.body,
            isSuccess: true,
          } : {
            errors: response.body,
            data: {},
            isSuccess: false,
          };
        })
      );
  }

  fetchCheckAuthenticated(): Observable<ResponseServiceState> {
    const { accessToken }: any = getTokensFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<Tokens>(
        `${this.siteURL}/auth/jwt/verify/`,
        { token: accessToken },
        {
          headers,
          observe: 'response',
        }
      )

      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        map((response: HttpResponse<any>) => {
          return response.status === 200 ? {
            errors: {},
            data: response?.body,
            isSuccess: true,
          } : {
            errors: response?.body,
            data: {},
            isSuccess: false,
          };
        })
      );
  }

}