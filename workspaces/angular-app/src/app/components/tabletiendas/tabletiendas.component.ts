import { Tienda, TiendaState } from '@/app/models/tienda.models';
import { desactivateTiendaAction, loadTiendasAction } from '@/app/state/actions/tienda.actions';
import { AppState } from '@/app/state/app.state';
import { selectTienda } from '@/app/state/selectors/tienda.selectors';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tabletiendas',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon, FormsModule],
  templateUrl: './tabletiendas.component.html',
  styleUrl: './tabletiendas.component.scss'
})
export class TabletiendasComponent implements OnInit {


  displayedColumns = ['id', 'nombre', 'direccion', 'ciudad', 'telefono', 'capacidad', 'ruc', 'activo', 'acciones'];

  dataSource = new MatTableDataSource<Tienda>([]);
  editingId: number | any = null;
  editedTienda: Partial<Tienda> = {};

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.dispatch(loadTiendasAction());

    this.store.select(selectTienda).subscribe((tiendaState: TiendaState) => {
      this.dataSource.data = tiendaState.tiendas;
    });
  }

  onDeleteTienda(id: number) {

  }

  onEditTienda(tienda: Tienda) {
    this.editingId = tienda.id;
    this.editedTienda = { ...tienda };
  }

  onUpdateTienda() {
    console.log('Datos actualizados:', this.editedTienda);

    this.editingId = null;
  }

  onCancelEdit() {
    this.editingId = null;
  }
  onToggle(tienda: Tienda) {
    const newTienda = { ...tienda, activo: !tienda.activo };
    this.store.dispatch(desactivateTiendaAction({ id: newTienda.id, activo: newTienda.activo }));
  }

}
