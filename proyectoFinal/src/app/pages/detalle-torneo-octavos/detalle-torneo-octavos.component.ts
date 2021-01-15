import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router"
import Swal from "sweetalert2"
import {PartidosService} from "../../shared/partidos.service"

@Component({
  selector: 'app-detalle-torneo-octavos',
  templateUrl: './detalle-torneo-octavos.component.html',
  styleUrls: ['./detalle-torneo-octavos.component.css']
})
export class DetalleTorneoOctavosComponent implements OnInit {

  title = 'Detalle Torneo Octavos - G2P'
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
