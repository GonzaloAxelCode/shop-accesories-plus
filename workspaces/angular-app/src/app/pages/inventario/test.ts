import { Inventario } from '@/app/models/inventario.models';
import { Producto } from '@/app/models/producto.models';
import { Proveedor } from '@/app/models/proveedor.models';
import { Tienda } from '@/app/models/tienda.models';
import { User } from '@/app/models/user.models';
import { loadInventarios } from '@/app/state/actions/inventario.actions';


import { AppState } from '@/app/state/app.state';
import { InventarioState } from '@/app/state/reducers/inventario.reducer';
import { selectInventarioState } from '@/app/state/selectors/inventario.selectors';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { selectTiendaState } from '@/app/state/selectors/tienda.selectors';
import { selectUsersState } from '@/app/state/selectors/user.selectors';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-form-inventario',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatIcon, FormsModule, MatSelectModule, MatButtonModule],
    templateUrl: './inventario.component.html',
    styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {
    dataSource = new MatTableDataSource<Partial<Inventario>>([]);
    displayedColumns: string[] = ['producto', 'tienda', 'proveedor', 'responsable', 'cantidad', 'stock_minimo', 'stock_maximo', 'costo', 'descripcion', 'acciones'];
    editingId: number | null = null;
    editedInventario: Partial<Inventario> = {};
    productos: Producto[] = [];
    tiendas: Tienda[] = [];
    proveedores: Proveedor[] = [];
    usuarios: User[] = [];

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.store.dispatch(loadInventarios({ tiendaId: 1 }));

        this.store.select(selectInventarioState).subscribe((state: InventarioState) => {
            this.dataSource.data = [...state.inventarios];
        });

        this.store.select(selectProductoState).subscribe(state => {
            this.productos = [...state.productos];
        });

        this.store.select(selectTiendaState).subscribe(state => {
            this.tiendas = [...state.tiendas];
        });

        this.store.select(selectProveedorState).subscribe(state => {
            this.proveedores = [...state.proveedores];
        });

        this.store.select(selectUsersState).subscribe(state => {
            this.usuarios = [...state.users];
        });
    }

    onEditInventario(inventario: Inventario): void {
        this.editingId = inventario.id;
        this.editedInventario = { ...inventario };
    }

    onCancelEdit(): void {
        this.editingId = null;
        this.editedInventario = {};
    }

    onUpdateInventario(): void {
        if (this.editingId !== null) {
            console.log('Actualizando inventario:', this.editedInventario);
            this.onCancelEdit();
        }
    }

    onDeleteInventario(id: number): void {
        console.log('Eliminando inventario con ID:', id);
    }
}

