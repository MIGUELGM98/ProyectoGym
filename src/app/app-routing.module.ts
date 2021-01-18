import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { PreciosComponent } from './precios/precios.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'inscripcion',pathMatch:'full'
  },
  {
    path:'inscripcion',component:InscripcionComponent
  },
  {
    path:'listado-clientes', component:ListadoClientesComponent
  },
  {
    path:'agregar-cliente',component:AgregarClienteComponent
  },
  {
    path:'agregar-cliente/:clienteID',component:AgregarClienteComponent
  },
  {
    path:'precios',component:PreciosComponent
  },
  {
    path:'listado-inscripciones', component:ListadoInscripcionesComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
