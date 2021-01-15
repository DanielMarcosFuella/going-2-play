import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidosService } from 'src/app/shared/partidos.service';
import { PosicionService } from 'src/app/shared/posicion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-torneo-semi',
  templateUrl: './detalle-torneo-semi.component.html',
  styleUrls: ['./detalle-torneo-semi.component.css'],
})
export class DetalleTorneoSemiComponent implements OnInit {
  title = 'Detalle Torneo Semifinales - G2P';
  imglogo = 'assets/images/logo.png'
  public isMobileLayout = false;
  public partidosList: any
  private torneoId: string

  constructor(
    private route: ActivatedRoute,
    private partidosService: PartidosService,
    private serviceTitle: Title
  ) {
    this.torneoId = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1200;
    this.serviceTitle.setTitle(this.title)
    this.getEquiposByTorneo()
  }

  private getEquiposByTorneo() {
    this.partidosService.getPartidosByTorneoID(Number(this.torneoId))
      .subscribe((res: any) => {
        this.partidosList = res
      }, err => {
        this.showError()
      })
  }

  private showError(title: string = 'Ha ocurrido un error') {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
