import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  usuario:firebase.User;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {

  }

  logout(){
    this.auth.signOut();
  }

}
