import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-perfil-teams',
  templateUrl: './perfil-teams.component.html',
  styleUrls: ['./perfil-teams.component.css']
})
export class PerfilTeamsComponent implements OnInit {
  imgSrc = 'assets/images/logo.png'
  title = 'Equipo - G2P'
  constructor(private serviceTitle:Title, public userService:UserService) { }

  hola(){
    console.log("Hola");
    alert("Hola");
    
  }


  isBanned(){
    this.userService.isBanned()

  }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)
  this.isBanned()

  }

}
