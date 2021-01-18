import { MensajesService } from './../servicios/mensajes.service';
import { Precio } from './../models/precio';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from './../models/cliente';
import { Inscripcion } from './../models/inscripcion';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion= new Inscripcion();
  precios:Precio[]= new Array<Precio>();
  precioSeleccionado:Precio= new Precio();
  clienteSeleccionado:Cliente= new Cliente();
  idPrecio:string='null';

  constructor(private db: AngularFirestore,
    private msj:MensajesService) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio= item.data() as Precio;
        precio.id=item.id;
        precio.ref=item.ref;
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente= cliente.ref;
    this.clienteSeleccionado=cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado=new Cliente();
    this.inscripcion.cliente=undefined;
  }

  guardar(){
    console.log(this.inscripcion)
    if(this.inscripcion.validar().esValido){
      let inscripcionAgregar={
        fecha:this.inscripcion.fecha,
        fechaFinal:this.inscripcion.fechaFinal,
        cliente:this.inscripcion.cliente,
        precios:this.inscripcion.precios,
        subTotal:this.inscripcion.subTotal,
        impuesto:this.inscripcion.impuesto,
        total:this.inscripcion.total
      }
      this.db.collection('inscripcion').add(inscripcionAgregar).then((resultado)=>{
        this.msj.mensajeCorrecto("Listo","Cliente guardado con exito")
        this.inscripcion= new Inscripcion();
        this.clienteSeleccionado= new Cliente();
        this.precioSeleccionado= new Precio();
        this.idPrecio='null';

      })      
    }else{
      this.msj.mensajeAdvertencia("Error",this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio(id:string){

    if(id != "null"){
      this.precioSeleccionado=this.precios.find(x=>x.id==id);
      this.inscripcion.precios=this.precioSeleccionado.ref;
      console.log(this.precioSeleccionado)
      this.inscripcion.fecha= new Date();
  
      let iva=this.precioSeleccionado.costo*.16;
      this.inscripcion.subTotal = this.precioSeleccionado.costo-iva;
      this.inscripcion.impuesto=iva;
      this.inscripcion.total=this.precioSeleccionado.costo;
  
      //dia
      if(this.precioSeleccionado.tipoDuracion==1){
        let dias:number=this.precioSeleccionado.duracion;      
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal= fechaFinal;
      }
  
      //semana
      if(this.precioSeleccionado.tipoDuracion==2){
        let dias:number=this.precioSeleccionado.duracion-1;      
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal= fechaFinal;
      }
  
      //quincena
      if(this.precioSeleccionado.tipoDuracion==3){
        let dias:number=this.precioSeleccionado.duracion-2;      
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal= fechaFinal;
      }
      
      //mes
      if(this.precioSeleccionado.tipoDuracion==4){
        let meses=this.precioSeleccionado.duracion;
        let fechaFinal=
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth()+meses,this.inscripcion.fecha.getDate())
        this.inscripcion.fechaFinal=fechaFinal;
      }
  
      //año
      if(this.precioSeleccionado.tipoDuracion==5){
        let años=this.precioSeleccionado.duracion;
        let fechaFinal=
        new Date(this.inscripcion.fecha.getFullYear()+años,this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate())
        this.inscripcion.fechaFinal=fechaFinal;
      }
    }else{
      this.precioSeleccionado= new Precio();
      this.inscripcion.fecha=null;
      this.inscripcion.fechaFinal=null;
      this.inscripcion.precios=null;
      this.inscripcion.subTotal=null;
      this.inscripcion.impuesto=null;
      this.inscripcion.total=null;
    }
    
  }

}
