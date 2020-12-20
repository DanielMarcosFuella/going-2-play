import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {
  imageAshe = 'assets/asheHeader.jpg'
  imageJhin = 'assets/lolHeader.jpg'
  fifa1vs1 = 'assets/FIFA-21-Header.jpg'
  fifa11vs11 = 'assets/fifa.jpg'
  trofeo = 'assets/trofeo.png'
  lolLogo= 'assets/lolLogo.png'
  fifaLogo= 'assets/fifaLogo.png'
  imgSrc = 'assets/images/logo.png'
  lol:boolean
  fifa:boolean
  title = 'Torneos - G2P'
  constructor(private serviceTitle:Title) {
    this.fifa=false
    this.lol=false
   }
  
  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)

  }

}
