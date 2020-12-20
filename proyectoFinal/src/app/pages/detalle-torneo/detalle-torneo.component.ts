import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.css']
})
export class DetalleTorneoComponent implements OnInit {
  
  title = 'Detalle Torneo Cuartos - G2P'
  imglogo = 'assets/images/logo.png'

  constructor(private serviceTitle:Title) { }

  public isMobileLayout = false;
  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
    this.serviceTitle.setTitle(this.title)

  }

}
