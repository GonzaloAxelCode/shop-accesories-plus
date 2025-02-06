import { createCategoriaAction } from '@/app/state/actions/categoria.actions';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import urlSlug from 'url-slug';
import { TablecategoriesComponent } from "../../components/tablecategories/tablecategories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule, TablecategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  categoryForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {

    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      slug: ['']
    });
  }



  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      const newCategory = this.categoryForm.value
      this.store.dispatch(createCategoriaAction({
        categoria: {
          ...newCategory,
          slug: urlSlug(newCategory.nombre)
        }
      }))
    }
  }
}
