import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Partidos } from 'src/app/models/partidos';
import { G2pService } from 'src/app/shared/partidos.service';

@Component({
  selector: 'app-mis-partidas',
  templateUrl: './mis-partidas.component.html',
  styleUrls: ['./mis-partidas.component.css']
})
export class MisPartidasComponent implements OnInit {

  title = 'Mis Partidas - G2P'

  public partido: Partidos;
  public partidoArray: Partidos[];

  constructor(private serviceTitle: Title, private partidoService: G2pService) { 

    this.partido = this.partidoService.partido;
    this.partidoArray = [];
  }

  ngOnInit(): void {

    this.serviceTitle.setTitle(this.title)

    let id = JSON.parse(localStorage.getItem("usuario")).usuario_id

    this.partidoService.getMisPartidos(id).subscribe((data:Partidos[])=>{
    this.partidoArray = data;

    console.log(this.partidoArray);
    
     });

  }

}
