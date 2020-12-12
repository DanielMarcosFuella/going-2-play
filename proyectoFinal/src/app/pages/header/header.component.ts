import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/images/logo.png'  
  imageAlt = 'iPhone'
  constructor() { }

  ngOnInit(): void {
  }

}
