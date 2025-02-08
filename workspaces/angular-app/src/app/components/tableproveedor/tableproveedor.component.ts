import { Proveedor } from '@/app/models/proveedor.models';
import { deleteProveedorAction, loadProveedores } from '@/app/state/actions/proveedor.actions';
import { AppState } from '@/app/state/app.state';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tableproveedor',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, FormsModule],
  templateUrl: './tableproveedor.component.html',
  styleUrl: './tableproveedor.component.scss'
})
export class TableproveedorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono', 'tipo_producto', 'acciones'];
  dataSource = new MatTableDataSource<Proveedor>([]);
  editingId: number | null = null;
  editedProveedor: Partial<Proveedor> = {};

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadProveedores());

    this.store.select(selectProveedorState).subscribe((proveedorState: ProveedorState) => {
      this.dataSource.data = proveedorState.proveedores;
    });
  }

  onDeleteProveedor(id: number) {
    this.store.dispatch(deleteProveedorAction({ id }));
  }

  onEditProveedor(proveedor: Proveedor) {
    this.editingId = proveedor.id;
    this.editedProveedor = { ...proveedor };
  }

  onUpdateProveedor() {
    console.log('Datos actualizados:', this.editedProveedor);
    this.editingId = null;
  }

  onCancelEdit() {
    this.editingId = null;
  }
}
