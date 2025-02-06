import { AppState } from '@/app/state/app.state';
import { selectAuth } from '@/app/state/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatSidenavModule, RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule, MatExpansionModule, MatTooltipModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  constructor(private store: Store<AppState>, private toastr: ToastrService) {

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
}
