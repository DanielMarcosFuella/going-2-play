import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {
  imgSrc = 'assets/images/logo.png'

  constructor() { }

  ngOnInit(): void {
  }

}
