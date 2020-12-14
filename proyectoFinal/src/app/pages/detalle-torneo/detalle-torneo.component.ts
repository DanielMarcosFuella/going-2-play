import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.css']
})
export class DetalleTorneoComponent implements OnInit {
  
  constructor() { }
  public isMobileLayout = false;
  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
  }

}
