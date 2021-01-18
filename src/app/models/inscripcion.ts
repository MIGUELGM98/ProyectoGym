import { DocumentReference } from '@angular/fire/firestore';
export class Inscripcion{
    fecha:Date;
    fechaFinal:Date;
    cliente:DocumentReference;
    precios:DocumentReference;
    subTotal:number;
    impuesto:number;
    total:number;

    constructor(){
        this.fecha=null;
        this.fechaFinal=null;
        this.cliente=this.cliente;
        this.precios=this.precios;
        this.subTotal=this.subTotal;
        this.impuesto=this.impuesto;
        this.total=this.total;        
    }

    validar():any{
        let respuesta={
            esValido:false,
            mensaje:''
        }
        if(this.cliente==null || this.cliente==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='Por favor seleccione un cliente'
            return respuesta;
        }

        if(this.precios==null || this.precios==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='No a seleccionado un precio'
            return respuesta;
        }
        if(this.fecha==null || this.fecha==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='No tiene fecha de inicio'
            return respuesta;
        }
        if(this.fechaFinal==null || this.fechaFinal==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='No tiene fecha final'
            return respuesta;
        }        
        if(this.impuesto<=0 || this.impuesto==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='No se puede calcular el impuesto'
            return respuesta;
        }
        if(this.subTotal==null || this.subTotal==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='No se puede calcular el subtotal'
            return respuesta;
        }
        if(this.total==null || this.total==undefined){
            respuesta.esValido=false;
            respuesta.mensaje='No se puede calcular el total'
            return respuesta;
        }
        respuesta.esValido=true;
        return respuesta;

    }
}