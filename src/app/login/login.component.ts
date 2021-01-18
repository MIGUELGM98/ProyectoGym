import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin:FormGroup;
  datosCorrecto:boolean=true;
  textoError:string='';

  constructor(public spinner:NgxSpinnerService, public creadorFormulario:FormBuilder,
     public auth:AngularFireAuth) { }

  ngOnInit(): void {
    this.formularioLogin=this.creadorFormulario.group({
      email:['',Validators.compose([
        Validators.required,Validators.email])],
      password:['',Validators.required]
    });
  }

  ingresar(){
    if(this.formularioLogin.valid){
      this.datosCorrecto=true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password)
      .then((usuario)=>{
      console.log(usuario);
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }).catch((error)=>{
      this.datosCorrecto=false;
      setTimeout(() => {
        this.spinner.hide();
      }, 1500);
      this.textoError=error.message;

    })
    }else{
      this.datosCorrecto=false;
      this.textoError='Porfavor revise que los datos son correctos'
    }
    
  }

}
