import { Component, OnInit } from '@angular/core';

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
  lol:boolean
  fifa:boolean
  constructor() {
    this.fifa=false
    this.lol=false
   }
  
  ngOnInit(): void {
  }

}
