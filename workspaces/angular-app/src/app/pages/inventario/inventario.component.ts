import { Inventario } from '@/app/models/inventario.models';
import { ProductoState } from '@/app/models/producto.models';
import { TiendaState } from '@/app/models/tienda.models';
import { createInventario, loadInventarios } from '@/app/state/actions/inventario.actions';
import { loadProductosAction } from '@/app/state/actions/producto.actions';
import { loadProveedores } from '@/app/state/actions/proveedor.actions';
import { loadTiendasAction } from '@/app/state/actions/tienda.actions';
import { loadUsersAction } from '@/app/state/actions/user.actions';
import { AppState } from '@/app/state/app.state';
import { InventarioState } from '@/app/state/reducers/inventario.reducer';
import { ProveedorState } from '@/app/state/reducers/proveedor.reducer';
import { UserState } from '@/app/state/reducers/user.reducer';
import { selectInventarioState } from '@/app/state/selectors/inventario.selectors';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { selectProveedorState } from '@/app/state/selectors/proveedor.selectors';
import { selectTiendaState } from '@/app/state/selectors/tienda.selectors';
import { selectUsersState } from '@/app/state/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {

  inventarioForm2!: FormGroup;
  productos: any[] = [];
  tiendas: any[] = [];
  proveedores: any[] = [];
  usuarios: any[] = [];

  dataSource = new MatTableDataSource<Partial<Inventario>>([]);
  displayedColumns: string[] = ['producto', 'tienda', 'proveedor', 'responsable', 'cantidad', 'stock_minimo', 'stock_maximo', 'costo', 'descripcion', 'acciones'];
  editingId: number | null = null;
  editedInventario: Partial<Inventario> = {};


  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.inventarioForm2 = this.fb.group({
      producto: ['', Validators.required],
      tienda: ['', Validators.required],
      proveedor: ['', Validators.required],
      responsable: ['', Validators.required], // Cambia responsableId por responsable
      cantidad: ['', Validators.required],
      stock_minimo: ['', Validators.required], // Corrige el typo
      stock_maximo: ['', Validators.required], // Corrige el typo
      costo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.store.dispatch(loadInventarios({ tiendaId: 1 }));

    this.store.dispatch(loadProductosAction())
    this.store.dispatch(loadProveedores())
    this.store.dispatch(loadTiendasAction())
    this.store.dispatch(loadUsersAction())




    this.store.select(selectInventarioState).subscribe((state: InventarioState) => {

      this.dataSource.data = state.inventarios;

    });
    this.store.select(selectProductoState).subscribe((state: ProductoState) => {
      this.productos = state.productos;

    });

    // Cargar tiendas desde el estado
    this.store.select(selectTiendaState).subscribe((state: TiendaState) => {
      this.tiendas = state.tiendas;
    });

    // Cargar proveedores desde el estado
    this.store.select(selectProveedorState).subscribe((state: ProveedorState) => {
      this.proveedores = state.proveedores;
    });

    // Cargar usuarios desde el estado
    this.store.select(selectUsersState).subscribe((state: UserState) => {
      this.usuarios = state.users;
    });

  }

  onSubmit() {
    if (this.inventarioForm2.valid) {
      console.log(this.inventarioForm2.value);
      this.store.dispatch(createInventario({ inventario: this.inventarioForm2.value }));
    }
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