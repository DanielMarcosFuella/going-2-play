import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-reglas',
  templateUrl: './admin-reglas.component.html',
  styleUrls: ['./admin-reglas.component.css']
})
export class AdminReglasComponent implements OnInit {
  title = 'ADM - REGLAS'

  constructor(private serviceTitle:Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title)
  }

}
