import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {
  imageSrc = 'assets/images/logo.png'
  constructor() { }

  ngOnInit(): void {
  }

}
