import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-torneo-semi',
  templateUrl: './detalle-torneo-semi.component.html',
  styleUrls: ['./detalle-torneo-semi.component.css']
})
export class DetalleTorneoSemiComponent implements OnInit {

  title = 'Detalle Torneo Semifinales - G2P'
  imglogo = 'assets/images/logo.png'

  constructor(private serviceTitle:Title) { }

  public isMobileLayout = false;
  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
    this.serviceTitle.setTitle(this.title)

  }

}
