import { createTiendaAction } from '@/app/state/actions/tienda.actions';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-formaddtienda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule,
    MatFormFieldModule, MatIconModule,
    MatButtonModule],
  templateUrl: './formaddtienda.component.html',
  styleUrl: './formaddtienda.component.scss'
})
export class FormaddtiendaComponent {

  tiendaForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {

    this.tiendaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
      ruc: ['', Validators.required]
    });
  }



  onSubmit() {
    if (this.tiendaForm.valid) {
      console.log(this.tiendaForm.value);
      const newTienda = this.tiendaForm.value
      this.store.dispatch(createTiendaAction({
        tienda: newTienda
      }))
    }
  }
}
