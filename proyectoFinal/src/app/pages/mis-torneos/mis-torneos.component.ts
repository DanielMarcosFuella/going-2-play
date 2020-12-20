import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mis-torneos',
  templateUrl: './mis-torneos.component.html',
  styleUrls: ['./mis-torneos.component.css']
})
export class MisTorneosComponent implements OnInit {
  title = 'Mis Torneos - G2P'

  constructor(private serviceTitle:Title) { }

  ngOnInit(): void {
  this.serviceTitle.setTitle(this.title)

  }

}
