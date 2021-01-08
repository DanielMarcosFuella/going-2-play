import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Torneo } from 'src/app/models/torneo';
import { TorneoService } from 'src/app/shared/torneo.service';

@Component({
  selector: 'app-mis-torneos',
  templateUrl: './mis-torneos.component.html',
  styleUrls: ['./mis-torneos.component.css']
})
export class MisTorneosComponent implements OnInit {
  title = 'Mis Torneos - G2P'
  public torneo: Torneo;
  public torneoArray: Torneo[];

  constructor(private serviceTitle:Title, private torneoService: TorneoService, private route: ActivatedRoute) { 

    this.torneo = this.torneoService.torneo;
    this.torneoArray = [];
  }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)
  
  let id = JSON.parse(localStorage.getItem("usuario")).usuario_id 
  
  this.torneoService.getTorneoByID(id).subscribe((data:Torneo[])=>{
    this.torneoArray = data;
    localStorage.setItem("perfilTorneo", JSON.stringify(this.torneoService.torneo));
    console.log(this.torneoArray);
  });
  
  }

}
