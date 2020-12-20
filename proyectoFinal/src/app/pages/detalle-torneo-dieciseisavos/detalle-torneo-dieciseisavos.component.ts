import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-torneo-dieciseisavos',
  templateUrl: './detalle-torneo-dieciseisavos.component.html',
  styleUrls: ['./detalle-torneo-dieciseisavos.component.css']
})
export class DetalleTorneoDieciseisavosComponent implements OnInit {

  title = 'Detalle Torneo Dieciseisavos - G2P'
  imglogo = 'assets/images/logo.png'

  constructor(private serviceTitle:Title) { }

  public isMobileLayout = false;
  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
    this.serviceTitle.setTitle(this.title)

  }
}
