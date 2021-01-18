import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes:any[]= new Array<any>();
  constructor(public db:AngularFirestore) { }

  ngOnInit(): void {
    /* this.db.collection('clientes').valueChanges().subscribe((resultado)=>{
      this.clientes=resultado;
      console.log(resultado);
    }) */

    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        
        let cliente:any = item.data();
        cliente.id=item.id;
        this.clientes.push(cliente)
      })

    })
  }

}
