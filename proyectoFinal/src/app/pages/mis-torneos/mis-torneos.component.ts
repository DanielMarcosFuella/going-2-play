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
  public saveUrl: string;

  constructor(private serviceTitle:Title, private torneoService: TorneoService, private route: ActivatedRoute) { 

    this.saveUrl = this.route.snapshot.queryParams.id;
    this.torneo = this.torneoService.torneo;
  }

  getTorneoByID() {
    this.torneoService.getTorneoByID(this.saveUrl).subscribe((data:Torneo[])=>{
      this.torneoService.torneo = data[0];
      localStorage.setItem("perfilTorneo", JSON.stringify(this.torneoService.torneo));
      this.torneo = this.torneoService.torneo;
      console.log(this.torneo);
    });
  }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)
  this.getTorneoByID();
  this.torneoService.torneo = JSON.parse(localStorage.getItem("perfilTorneo"));
  this.torneo = this.torneoService.torneo;
  console.log(this.torneo);
  }

}
