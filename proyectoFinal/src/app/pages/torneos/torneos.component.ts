import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { Equipo } from 'src/app/models/equipo';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css'],
})
export class TorneosComponent implements OnInit {
  @ViewChild('modalApuntate') modalApuntate;
  @ViewChild('registrateButton') registrateButton;

  imageAshe = 'assets/asheHeader.jpg';
  imageJhin = 'assets/lolHeader.jpg';
  fifa1vs1 = 'assets/FIFA-21-Header.jpg';
  fifa11vs11 = 'assets/fifa.jpg';
  trofeo = 'assets/trofeo.png';
  lolLogo = 'assets/lolLogo.png';
  fifaLogo = 'assets/fifaLogo.png';
  imgSrc = 'assets/images/logo.png';
  public dataTop10: User[];
  public dataTeamTop5: [];
  public yourRankTop: User;
  public yourRankTopTeam: Equipo;
  public topOne: User;
  public estado: string[];
  public teamTopOne: any;
  public yourNumberTop: number;
  public yourNumberTopTeam: number;
  public juegos: any[];
  public myIndex: number;
  public jugadores: any;
  public innerHTML: string;
  user: boolean;
  team: boolean;
  anio: number = new Date().getFullYear();
  title = 'Torneos - G2P';
  public userlogin: boolean;
  public home: any[];
  constructor(
    private router: Router,
    public userService: UserService,
    private serviceTitle: Title,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.team = false;
    this.dataTop10 = this.userService.usersRank;
    this.estado = ['ACTIVO', 'PENDIENTE', 'FINALIZADO'];
    this.dataTeamTop5 = this.userService.teamRank;
    this.topOne = this.userService.userTopOne;
    this.myIndex = 0;
    this.teamTopOne = this.userService.teamTopOne;
    this.jugadores = [];
    this.user = true;
    this.innerHTML = '';
    this.userlogin = false;
  }

  goPerfil(nickname: string) {
    this.router.navigateByUrl('/perfil?nickname=' + nickname);
  }

  goPerfilTeam(id: number) {
    this.router.navigateByUrl('/perfil-equipo?id=' + id);
  }

  rankTop10() {
    this.userService.rankTop10().subscribe((data: User[]) => {
      this.userService.usersRank = data;
      this.dataTop10 = this.userService.usersRank;
      localStorage.setItem('ranktop10', JSON.stringify(this.dataTop10));
    });
  }



  rankTop5Team() {
    this.userService.rankTop5Team().subscribe((data: []) => {
      this.userService.teamRank = data;
      this.dataTeamTop5 = this.userService.teamRank;
      localStorage.setItem('ranktop5team', JSON.stringify(this.dataTeamTop5));
    });
  }

  findYourTop() {
    this.userService.yourtop().subscribe((data: User[]) => {
      const saveTop = data;
      const saveName = this.userService.usuarios.nickname;
      let found = saveTop.find(function (element) {
        return element.nickname === saveName;
      });
      const isLargeNumber = (element) => element.nickname === saveName;
      this.yourRankTop = found;
      const saveYourTop = saveTop.findIndex(isLargeNumber) + 1;
      this.yourNumberTop = saveYourTop;
    });
  }

  findTopOne() {
    this.userService.topOne().subscribe((data: User) => {
      this.userService.userTopOne = data[0];
      this.topOne = this.userService.userTopOne;
    });
    this.userService.getOneTopTeam().subscribe((data) => {
      this.userService.teamTopOne = data[0];
      this.teamTopOne = this.userService.teamTopOne;
    });
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  apuntate(){
    if(this.userlogin === true){
      this.modalApuntate.nativeElement.click();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error', 
        title: 'Por favor inicia sesión o registrate',
        showConfirmButton: false,
        timer: 2000,
      });
      $('#ManualMinMaxModal').modal('show');
      this.registrateButton.nativeElement.click();
      
    }
  }

  changeEquipo() {
    if (this.user === true) {
      this.user = false;
      this.team = true;
    } else {
      this.user = true;
      this.team = false;
    }
  }
  onItemChange(value) {
    this.team = value;
  }

  getColor(estado) { 
    switch (estado) {
      case 'ACTIVO':
        return '#28a745';
      case 'PENDIENTE':
        return '#ffc107';
      case 'FINALIZADO':
        return '#dc3545';
    }
  }

  search(id: any, estado: any) {
    const saveGame = this.route.snapshot.queryParams.game;
    const saveEstado = this.route.snapshot.queryParams.estado;

    
    if (id === "all" && estado === "all") {
      this.userService.getHome().subscribe((data: []) => {
        this.home = data;
      });
    } 
    if(id === 'all' && estado != "all"){
      this.userService.getHomeSearch(id, estado).subscribe((data: []) => {
        this.home = data;
      });
     
    } 
    if(id && estado === '0'){
      this.userService.getHomeSearch(id, estado).subscribe((data: []) => {
        this.home = data;
      });
    }

    if(id && estado){
      this.userService.getHomeSearch(id, estado).subscribe((data: []) => {
        this.home = data;
      });
    }
    
    
  }

  getTeamsById() {
    this.userService
      .yourTeamRank(this.userService.usuarios.usuario_id)
      .subscribe((data) => {
        const dataPlayerJSON = JSON.stringify(data[0]);
        const dataPlayer = JSON.parse(dataPlayerJSON);
        this.jugadores = dataPlayer;
        const newTeam = JSON.parse(localStorage.getItem('ranktop5team'));

        const saveID = this.userService.usuarios.usuario_id;
        let found = newTeam.find(function (element) {
          return element.capitan_id === saveID;
        });
        const isLargeNumber = (element) => element.capitan_id === saveID;
        this.yourRankTopTeam = found;
        const saveYourTop = newTeam.findIndex(isLargeNumber) + 1;
        this.yourNumberTopTeam = saveYourTop;
      });
  }

  getHome() {
    this.userService.getHome().subscribe((data: any[]) => {
      this.home = data;
    });
  }

  getJuegos() {
    this.userService.getJuegos().subscribe((data: []) => {
      this.userService.adminJuegos = data;
      this.juegos = this.userService.adminJuegos;
    });
  }

  getData(i: number) {
    this.myIndex = i;
    this.innerHTML = this.home[i].descripcion_regla;
  }

  ngOnInit(): void {
    this.getHome();
    this.rankTop10();
    this.rankTop5Team();
    this.findTopOne();
    this.findYourTop();
    this.getTeamsById();
    this.getJuegos();
    this.isLoggedIn();
    this.home;
    this.userService.usersRank = JSON.parse(localStorage.getItem('ranktop10'));
    this.dataTop10 = this.userService.usersRank;
    this.userService.teamRank = JSON.parse(
      localStorage.getItem('ranktop5team')
    );
    this.dataTeamTop5 = this.userService.teamRank;
    this.topOne = this.userService.userTopOne;
    this.serviceTitle.setTitle(this.title);
    
  }
}
