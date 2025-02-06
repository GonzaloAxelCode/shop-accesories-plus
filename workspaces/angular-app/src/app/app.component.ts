import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { checkTokenAction } from './state/actions/auth.actions';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',

  template: `<app-sidenav></app-sidenav>`,

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private store: Store<AppState>, private toastr: ToastrService) {

  }




  ngOnInit() {
    this.store.dispatch(checkTokenAction());
  }
}
