import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  logoG2= 'assets/g2.png'
  logoOg= 'assets/overgame.png'
  logoX6= 'assets/x6tence.png'
  logoGiants= 'assets/giants.png'
  title = 'Equipos - G2P'
  public jugadores1 
  constructor(private serviceTitle:Title) {
    this.jugadores1=1
   }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)

  }



}
