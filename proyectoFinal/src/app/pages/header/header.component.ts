import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/images/logo.png';
  imageAlt = 'iPhone';
  show:boolean;
  admin:boolean
  constructor() {
    this.show = true
    this.admin = true
   }

  ngOnInit(): void {
  }

}
