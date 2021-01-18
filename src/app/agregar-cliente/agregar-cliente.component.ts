import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { MensajesService } from '../servicios/mensajes.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss'],
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen:string='';
  esEditable: boolean = false;
  id: string;

  constructor(private fb: FormBuilder,
     private storage: AngularFireStorage,
     private db: AngularFirestore,
     private activeRoute:ActivatedRoute,
     private msj:MensajesService) {}

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params.clienteID);



    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });

    this.id = this.activeRoute.snapshot.params.clienteID;
    if(this.id != undefined)
    {
      this.esEditable = true;
      this.db.doc<any>('clientes' +'/' + this.id ).valueChanges().subscribe((cliente)=>{
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10) ,
          telefono: cliente.telefono,
          imgUrl: ''
        })
  
        this.urlImagen = cliente.imgUrl;
  
      });
    }
  }

  agregar() {
    console.log(this.formularioCliente.value);
    this.formularioCliente.value.imgUrl=this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento );

    this.db.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      this.msj.mensajeCorrecto('Agrego', 'Se agrego correctamente');
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Ocurrio algun error')

    })
  }

  
  editar()
  {
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento );
    

    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then(()=>{
      this.msj.mensajeCorrecto('Edito', 'Se edito correctamente');
    }).catch(()=>{
     this.msj.mensajeError('Error', 'Ocurrio algun error')
    })
  }

  subirImagen(evento) {
    if(evento.target.files.length>0){
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0];
      let extension = archivo.name
        .toString()
        .substring(archivo.name.toString().lastIndexOf('.'));
      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.urlImagen=url;
        });
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
        if (this.porcentajeSubida == 0) {
          this.porcentajeSubida = this.porcentajeSubida + 100;
        }
      });
    }
    
  }
}
