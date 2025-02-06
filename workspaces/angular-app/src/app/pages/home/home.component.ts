import { FromadduserComponent } from '@/app/components/fromadduser/fromadduser.component';
import { TabletiendasComponent } from '@/app/components/tabletiendas/tabletiendas.component';
import { TableUsersComponent } from '@/app/components/tableusers/tableusers.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormaddcategoriaComponent } from "../../components/formaddcategoria/formaddcategoria.component";
import { FormaddtiendaComponent } from "../../components/formaddtienda/formaddtienda.component";
import { TablecategoriesComponent } from "../../components/tablecategories/tablecategories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TablecategoriesComponent, TabletiendasComponent, FormaddtiendaComponent, FormaddtiendaComponent, TableUsersComponent, FromadduserComponent, FormaddcategoriaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



}
