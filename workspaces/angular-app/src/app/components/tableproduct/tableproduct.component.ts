import { Producto, ProductoState } from '@/app/models/producto.models';
import { loadProductosAction } from '@/app/state/actions/producto.actions';
import { AppState } from '@/app/state/app.state';
import { selectProductoState } from '@/app/state/selectors/producto.selectors';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tableproduct',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon, FormsModule],
  templateUrl: './tableproduct.component.html',
  styleUrl: './tableproduct.component.scss'
})
export class TableproductComponent implements OnInit {

  dataSource = new MatTableDataSource<Partial<Producto>>([]);
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'categoria', 'acciones'];
  editingId: number | null = null;
  editedProducto: Partial<Producto> = {}

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadProductosAction());

    this.store.select(selectProductoState).subscribe((state: ProductoState) => {

      const preparedProductos = [...state.productos].map((el: Producto) => {
        return {
          ...el,
          precio: parseFloat(el.precio)
        }
      })
      this.dataSource.data = preparedProductos
      console.log(state.productos)
    });
  }

  onEditProducto(producto: Producto): void {
    this.editingId = producto.id;
    this.editedProducto = { ...producto };
  }

  onCancelEdit(): void {
    this.editingId = null;
    this.editedProducto = {} as Producto;
  }

  onUpdateProducto(): void {
    if (this.editingId !== null) {

      this.onCancelEdit();
    }
  }

  onDeleteProducto(id: number): void {

  }
}
