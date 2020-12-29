import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-teams',
  templateUrl: './perfil-teams.component.html',
  styleUrls: ['./perfil-teams.component.css']
})
export class PerfilTeamsComponent implements OnInit {
  imgSrc = 'assets/images/logo.png'
  title = 'Equipo - G2P'
  constructor(private serviceTitle:Title) { }

  hola(){
    console.log("Hola");
    alert("Hola");
    
  }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)

  }

}
