import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {
  imgSrc = 'assets/images/logo.png'
  title = 'Perfil - G2P'

  constructor(private serviceTitle:Title) { }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)

  }

}
