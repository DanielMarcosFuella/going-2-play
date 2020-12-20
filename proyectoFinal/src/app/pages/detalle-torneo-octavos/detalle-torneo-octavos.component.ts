import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-torneo-octavos',
  templateUrl: './detalle-torneo-octavos.component.html',
  styleUrls: ['./detalle-torneo-octavos.component.css']
})
export class DetalleTorneoOctavosComponent implements OnInit {

  title = 'Detalle Torneo Octavos - G2P'
  imglogo = 'assets/images/logo.png'

  constructor(private serviceTitle:Title) { }

  public isMobileLayout = false;
  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
    this.serviceTitle.setTitle(this.title)

  }

}
