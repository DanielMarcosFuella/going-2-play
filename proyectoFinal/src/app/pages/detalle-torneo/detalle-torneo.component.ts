import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PosicionService } from 'src/app/shared/posicion.service';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.css']
})
export class DetalleTorneoComponent implements OnInit {
  
  title = 'Detalle Torneo Cuartos - G2P'
  imglogo = 'assets/images/logo.png'
  public saveUrl:number;

  constructor(private serviceTitle:Title, private route:ActivatedRoute, private posicion:PosicionService) { 
    this.saveUrl = this.route.snapshot.queryParams.id
  }

  getPosicionesByID(){
    this.posicion.getPosicion(this.saveUrl).subscribe((data:[])=>{
      console.log(data);
    })
  }

  public isMobileLayout = false;


  ngOnInit(): void {
    this.getPosicionesByID();
    console.log("Hpña");
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
    this.serviceTitle.setTitle(this.title)
    
  }

}
