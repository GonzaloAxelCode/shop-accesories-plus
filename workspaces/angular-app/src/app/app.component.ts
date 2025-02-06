import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { checkTokenAction } from './state/actions/auth.actions';
import { AppState } from './state/app.state';
import { selectAuth } from './state/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private store: Store<AppState>) {

    this.isAuthenticated$ = this.store.select(selectAuth).pipe(
      map(authState => authState.isAuthenticated)
    );

    this.loadingAuthenticated$ = this.store.select(selectAuth).pipe(
      map(authState => authState.loadingCheckAuthenticated)
    );
  }
  isAuthenticated$: Observable<any>;
  loadingAuthenticated$: Observable<any>;
  authState$ = this.store.pipe(select(selectAuth));



  ngOnInit() {

    this.store.dispatch(checkTokenAction());
  }
}
