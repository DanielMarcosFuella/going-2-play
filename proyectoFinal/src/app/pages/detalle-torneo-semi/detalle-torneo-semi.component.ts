import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PosicionService } from 'src/app/shared/posicion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-torneo-semi',
  templateUrl: './detalle-torneo-semi.component.html',
  styleUrls: ['./detalle-torneo-semi.component.css'],
})
export class DetalleTorneoSemiComponent implements OnInit {
  title = 'Detalle Torneo Semifinales - G2P';
  imglogo = 'assets/images/logo.png';
  public saveUrl: number;
  public saveData: any[];
  public dos: any[];
  public cuatro: any[];
  public seis: any[];

  constructor(
    private serviceTitle: Title,
    private route: ActivatedRoute,
    private router: Router,
    private posicion: PosicionService
  ) {
    this.saveUrl = this.route.snapshot.queryParams.id;
    this.saveData = this.posicion.saveData;
    this.dos = [];
    this.cuatro = [];
    this.seis = [];
  }

  comprobarurl() {
    console.log(this.route.snapshot.queryParams.id);

    if (this.saveUrl === undefined || this.saveUrl === null) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Algo ha fallado.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigateByUrl('/torneos');
    }
  }

  getPosicionesByID() {
    this.posicion.getPosicion(this.saveUrl).subscribe((data: []) => {
      this.saveData = data;

      for (let i = 0; i < this.saveData.length; i++) {
        if (
          this.saveData[i].posicion === 1 ||
          this.saveData[i].posicion === 2
        ) {
          this.dos.push(this.saveData[i]);
          console.log(this.dos);
        }

        if (
          this.saveData[i].posicion === 3 ||
          this.saveData[i].posicion === 4
        ) {
          this.cuatro.push(this.saveData[i]);
          console.log(this.cuatro);
        }

        if (
          this.saveData[i].posicion === 5 ||
          this.saveData[i].posicion === 6
        ) {
          this.seis.push(this.saveData[i]);
          console.log(this.seis);
        }
      }
    });
  }

  public isMobileLayout = false;

  ngOnInit(): void {
    this.getPosicionesByID();
    this.comprobarurl();
    this.dos;
    this.cuatro;
    this.seis;
    this.posicion.saveData = JSON.parse(localStorage.getItem('savedata'));
    this.saveData = this.posicion.saveData;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 1200);
    this.serviceTitle.setTitle(this.title);
  }
}
