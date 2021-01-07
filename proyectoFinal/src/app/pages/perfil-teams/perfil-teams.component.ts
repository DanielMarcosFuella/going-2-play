import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/shared/equipo.service';
import { UserService } from 'src/app/shared/user.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-perfil-teams',
  templateUrl: './perfil-teams.component.html',
  styleUrls: ['./perfil-teams.component.css']
})
export class PerfilTeamsComponent implements OnInit {
  imgSrc = 'assets/images/logo.png'
  title = 'Equipo - G2P'
  public equipo: Equipo;
  public equipos: Equipo[];
  public saveUrl: string;

  constructor(private serviceTitle:Title, public userService:UserService, private equipoService: EquipoService, private route: ActivatedRoute) { 

    this.saveUrl = this.route.snapshot.queryParams.id;
    this.equipo = this.equipoService.equipoOnly;
  }

  hola(){
    console.log("Hola");
    alert("Hola");
    
  }

  isBanned(){
    this.userService.isBanned()

  }

  getEquipoById() {
    this.equipoService.getEquipoByID(this.saveUrl).subscribe((data:Equipo[])=> {
      this.equipoService.equipoOnly = data[0];
      localStorage.setItem("perfilEquipo", JSON.stringify(this.equipoService.equipoOnly));
      this.equipo = this.equipoService.equipoOnly;
      console.log(this.equipo);
    })
  }

  borrarEquipo(id:number) {
    this.equipoService.borrarEquipo(id).subscribe((data) => {
      console.log("Se ha borrado el equipo")
    })
  }

  editarEquipo(equipo_id: number, nombre:string, logo:string, biografia:string) {

    if (nombre == "") {
      nombre = this.equipo.nombre;
    } else {
      this.equipo.nombre = nombre;
      localStorage.setItem('nombre', nombre);
    }
    if (logo == "") {
      logo = this.equipo.logo;
    } else {
      this.equipo.logo = logo;
      localStorage.setItem("logo", logo);
    }
    if (biografia == "") {
      biografia = this.equipo.biografia;
    } else {
      this.equipo.biografia = biografia;
      localStorage.setItem("biografia", biografia);
    }
    console.log(this.equipo);
    
    this.equipoService.updateEquipo(this.equipo).subscribe((data:Equipo)=>{
      localStorage.setItem("perfilEquipo", JSON.stringify(this.equipoService.equipoOnly));
      
    } )
  }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)
  this.isBanned()
  this.getEquipoById();
  this.equipoService.equipoOnly = JSON.parse(localStorage.getItem("perfilEquipo"));
  this.equipo = this.equipoService.equipoOnly;
  console.log(this.equipo)
  }

}
