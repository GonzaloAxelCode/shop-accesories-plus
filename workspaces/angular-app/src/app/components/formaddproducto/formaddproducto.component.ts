import { Categoria, CategoriaState } from '@/app/models/categoria.models';
import { createProductoAction } from '@/app/state/actions/producto.actions';
import { AppState } from '@/app/state/app.state';
import { selectCategoria } from '@/app/state/selectors/categoria.selectors';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-formaddproducto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatOption, MatSelect],
  templateUrl: './formaddproducto.component.html',
  styleUrl: './formaddproducto.component.scss'
})
export class FormaddproductoComponent {
  productoForm: FormGroup;
  categorias$: Observable<Categoria[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [null, Validators.required],
      sku: ['', Validators.required],
      marca: [''],
      modelo: [''],
      categoria: [null, Validators.required],

    });

    // Select categorias from the store
    this.categorias$ = this.store.select(selectCategoria).pipe(
      map((categoriaState: CategoriaState) => categoriaState.categorias)
    );
  }

  ngOnInit() {
    // Optional: You can dispatch a load action here if required for fetching categories
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;
      this.store.dispatch(createProductoAction({ producto: nuevoProducto }));
    }
  }
}
