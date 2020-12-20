import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-partidos',
  templateUrl: './admin-partidos.component.html',
  styleUrls: ['./admin-partidos.component.css']
})
export class AdminPartidosComponent implements OnInit {
  title = 'ADM - PARTIDOS'

  constructor(private serviceTitle:Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title)
  }

}
