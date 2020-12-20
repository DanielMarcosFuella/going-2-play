import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-torneos',
  templateUrl: './admin-torneos.component.html',
  styleUrls: ['./admin-torneos.component.css']
})
export class AdminTorneosComponent implements OnInit {
  title = 'ADM - TORNEOS'

  constructor(private serviceTitle:Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title)
  }
}
