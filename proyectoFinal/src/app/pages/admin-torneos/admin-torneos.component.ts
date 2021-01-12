import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Partidos } from 'src/app/models/partidos';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-torneos',
  templateUrl: './admin-torneos.component.html',
  styleUrls: ['./admin-torneos.component.css'],
})
export class AdminTorneosComponent implements OnInit {
  @ViewChild('editeTorneo') editeTorneo;
  @ViewChild('deleteTorneo') deleteTorneo;
  @ViewChild('addTorneo') addTorneo;
  @ViewChild('seeParti') seeParti;


  public indexDelete: number;
  public indexEdit: number;
  title = 'ADM - Torneos';
  public userlogin: boolean;
  public adminlogin: boolean;
  public adminTorneos: any[];
  public msge1: string;
  public msge2: string;
  public msg2e1: string;
  public juegos: any[];
  public torneos: any[];
  public msg2e2: string;
  public saveEquipo1: number;
  public saveEquipo2: number;
  constructor(
    private serviceTitle: Title,
    private auth: AuthService,
    private router: Router,
    private adminService: UserService
  ) {
    this.adminTorneos = this.adminService.adminTorneos;
    this.juegos = this.adminService.adminJuegos;
    this.userlogin = false;
    this.adminlogin = false;
    this.indexDelete = 0;
    this.indexEdit = 0;
    this.msge1 = '';
    this.msge2 = '';
    this.msg2e1 = '';
    this.msg2e2 = '';
    this.saveEquipo1 = 0;
    this.saveEquipo2 = 0;
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  noAdmin() {
    if (this.isLoggedIn() && this.adminService.usuarios.admin === 'admin') {
      return true;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No tienes permiso para entrar aqui',
        showConfirmButton: false,
        timer: 2000,
      });
      this.router.navigateByUrl('/');
      return false;
    }
  }

  getPartidos() {
    this.adminService.getPartidos().subscribe((data: []) => {
      this.adminService.adminTorneos = data;
      this.adminTorneos = this.adminService.adminTorneos;
      localStorage.setItem(
        'admintorneos',
        JSON.stringify(this.adminService.adminTorneos)
      );
    });
  }

  editPar(
    idremplace: any,
    partido_id: number,
    equipo1: any,
    equipo2: any,
    juego: number,
    fecha: string,
    hora: string,
    resultado1: any,
    resultado2: any,
    comentarios: string
  ) {
    let xi = JSON.parse(localStorage.getItem('admintorneos'));

    let found = xi.find(function (element) {
      return element.partido_id === partido_id;
    });

    if (equipo1 === 0) {
      equipo1 = found.equipo_first;
    } else {
      found.equipo_first = equipo1;
    }
    if (equipo2 === 0) {
      equipo2 = found.equipo_second;
    } else {
      found.equipo_second = equipo2;
    }
    if (juego === undefined || juego === null) {
      juego = Number(found.juego_id);
    } else {
      found.juego_id = Number(juego);
    }
    if (fecha === null || fecha === '' || fecha === undefined) {
      fecha = found.fecha;
    } else {
      found.fecha = fecha;
    }
    if (hora === '') {
      hora = found.hora;
    } else {
      found.hora = hora;
    }
    if (resultado1 === null || resultado1 === '' || resultado1 === undefined) {
      resultado1 = Number(found.resultado1);
    } else {
      found.resultado1 = Number(resultado1);
    }
    if (resultado2 === null || resultado2 === '' || resultado2 === undefined) {
      resultado2 = Number(found.resultado2);
    } else {
      found.resultado2 = Number(resultado2);
    }
    if (
      comentarios === null ||
      comentarios === '' ||
      comentarios === undefined
    ) {
      comentarios = found.comentarios;
    } else {
      found.comentarios = comentarios;
    }

    this.adminService.editPartidos(found).subscribe((data) => {
      this.adminService.getPartidos().subscribe((data: []) => {
        this.adminService.adminTeams = data;
        this.adminTorneos = this.adminService.adminTeams;
        localStorage.setItem('admintorneos', JSON.stringify(this.adminTorneos));
        let xi2 = JSON.parse(localStorage.getItem('admintorneos'));
        let found2 = xi2.find(function (element) {
          return element.partido_id === partido_id;
        });
        this.adminTorneos.splice(idremplace, 1, found2);
        localStorage.setItem('admintorneos', JSON.stringify(this.adminTorneos));
      });
      this.editeTorneo.nativeElement.click();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Partido modificado correctamente!',
        showConfirmButton: false,
        timer: 2500,
      });
    });
  }

  deletePar(id: any, id2: any) {
    let xi = JSON.parse(localStorage.getItem('admintorneos'));
    let found = xi.find(function (element) {
      return element.torneo_id === id;
    });
    if (found.estado === 'ACTIVO' || found.estado === 'PENDIENTE') {
      this.deleteTorneo.nativeElement.click();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `No puedes eliminar este partido, esta en un torneo en estado ${found.estado}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
    if (found.estado === null || found.estado === 'FINALIZADO') {
      this.adminService.deleteTorneo(parseInt(id)).subscribe((data) => {
        this.deleteTorneo.nativeElement.click();
        this.adminTorneos.splice(id2, 1);
        localStorage.setItem('admintorneos', JSON.stringify(this.adminTorneos));
        // this.rulesall =
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Partido eliminado correctamente!',
          showConfirmButton: false,
          timer: 2500,
        });
      });
    }
  }

  addPartido(
    equipo1: number,
    equipo2: number,
    juego_id: any,
    torneo_id: any,
    fecha: string,
    hora: string,
    comentario: string
  ) {
    if (
      torneo_id === '0' ||
      juego_id === '0' ||
      equipo1 === 0 ||
      equipo2 === 0
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor completa los campos',
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      this.adminService.partido = new Partidos(
        null,
        Number(torneo_id),
        Number(juego_id),
        fecha,
        hora,
        equipo1,
        equipo2,
        0,
        0,
        comentario
      );
      console.log(this.adminService.partido);

      this.adminService
        .addPartido(this.adminService.partido)
        .subscribe((data: any) => {
          this.getPartidos();
          this.addTorneo.nativeElement.click();

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Partido creada correctamente!',
            showConfirmButton: false,
            timer: 2500,
          });
        });
    }
  }

  getJuegos() {
    this.adminService.getJuegos().subscribe((data: []) => {
      this.adminService.adminJuegos = data;
      this.juegos = this.adminService.adminJuegos;
      localStorage.setItem(
        'adminjuegos',
        JSON.stringify(this.adminService.adminJuegos)
      );
      console.log(this.juegos);
    });
  }

  getTorneos() {
    this.adminService.getTorneosAll().subscribe((data: []) => {
      console.log(data);

      this.adminService.adminTorneos = data;
      this.adminTorneos = this.adminService.adminTorneos;
      localStorage.setItem(
        'admintorneos',
        JSON.stringify(this.adminService.adminTorneos)
      );
    });
  }

  verificare1(nickname: string) {
    if (nickname === '') {
      this.msge1 = 'Ningun equipo ingresado';
    } else {
      this.adminService.getTeamByName(nickname).subscribe((data: any) => {
        if (data.length == 0) {
          this.msge1 = 'Este equipo no existe';
          this.msg2e1 = '';
        } else {
          this.msge1 = '';
          this.msg2e1 = 'Equipo añadido correctamente';
          this.saveEquipo1 = data[0].equipo_id;
        }
      });
    }
  }
  verificare2(nickname: string) {
    if (nickname === '') {
      this.msge2 = 'Ningun equipo ingresado';
    } else {
      this.adminService.getTeamByName(nickname).subscribe((data: any) => {
        if (data.length == 0) {
          this.msge2 = 'Este equipo no existe';
          this.msg2e2 = '';
        } else {
          this.msge2 = '';
          this.msg2e2 = 'Equipo añadido correctamente';
          this.saveEquipo2 = data[0].equipo_id;
        }
      });
    }
  }

  getEquiposTorneos(id:number){
    this.adminService.getEquiposTorneos(id).subscribe((data:[])=>{
      console.log(data);
    })
  }

  public getDelete(i: number) {
    this.indexDelete = i;
  }

  public getEdit(i: number) {
    this.indexEdit = i;
  }

  ngOnInit(): void {
    this.getTorneos();
    this.getJuegos();
    this.noAdmin();
    this.adminService.adminTorneos = JSON.parse(
      localStorage.getItem('admintorneos')
    );
    this.adminTorneos = this.adminService.adminTorneos;
    this.adminService.adminJuegos = JSON.parse(
      localStorage.getItem('adminjuegos')
    );
    this.juegos = this.adminService.adminJuegos;

    this.serviceTitle.setTitle(this.title);
    console.log(this.adminTorneos);
  }
}
