import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Equipo } from 'src/app/models/equipo';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css'],
})
export class TorneosComponent implements OnInit {
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
  public topOne:User;
  public teamTopOne:any;
  public yourNumberTop:number;
  public yourNumberTopTeam:number;
  public jugadores: any;
  user: boolean;
  team: boolean;
  title = 'Torneos - G2P';
  public userlogin:boolean;
  constructor(
    private router: Router,
    public userService: UserService,
    private serviceTitle: Title,
    private auth: AuthService
  ) {
    this.team = false;
    this.dataTop10 = this.userService.usersRank;
    this.dataTeamTop5 = this.userService.teamRank;
    this.topOne = this.userService.userTopOne
    this.teamTopOne = this.userService.teamTopOne;
    this.jugadores = []
    this.user = true;
    this.userlogin = false
  }

  goPerfil(nickname: string) {
    this.router.navigateByUrl(
      '/perfil?nickname=' + nickname
    );
  }

  goPerfilTeam(id: number) {
    this.router.navigateByUrl(
      '/perfil-equipo?id=' + id
    );
  }

  rankTop10() {
    this.userService.rankTop10().subscribe((data: User[]) => {
      this.userService.usersRank = data;
      this.dataTop10 = this.userService.usersRank;
      localStorage.setItem('ranktop10', JSON.stringify(this.dataTop10));
    });
  }

  rankTop5Team(){
    this.userService.rankTop5Team().subscribe((data:[])=>{
      this.userService.teamRank = data;
      this.dataTeamTop5 = this.userService.teamRank;
      localStorage.setItem('ranktop5team', JSON.stringify(this.dataTeamTop5))
    })
  }

  findYourTop(){
    this.userService.yourtop().subscribe((data:User[])=>{
      const saveTop = data;
      const saveName = this.userService.usuarios.nickname
      let found = saveTop.find(function (element) {
        return element.nickname === saveName;
      });
      const isLargeNumber = (element) => element.nickname === saveName;
      this.yourRankTop = found
      const saveYourTop = saveTop.findIndex(isLargeNumber) + 1
      this.yourNumberTop = saveYourTop
    })
  }

  findTopOne(){
    this.userService.topOne().subscribe((data:User)=>{
      this.userService.userTopOne = data[0];
      this.topOne = this.userService.userTopOne;
    })
    this.userService.getOneTopTeam().subscribe((data)=>{
      this.userService.teamTopOne = data[0];
    this.teamTopOne = this.userService.teamTopOne;
    })
    
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }
  
  changeEquipo(){

    if(this.user === true){
      this.user = false;
      this.team = true;
    }else {
      this.user = true;
      this.team = false;
    }

  }
  onItemChange(value){
    console.log(" Value is : ", value );
    this.team = value
 }

  getTeamsById() {

    this.userService.yourTeamRank(this.userService.usuarios.usuario_id).subscribe((data) => {
      const dataPlayerJSON = JSON.stringify(data[0]);
      const dataPlayer = JSON.parse(dataPlayerJSON);
      this.jugadores = dataPlayer;
      console.log(this.jugadores);
      const newTeam = JSON.parse(localStorage.getItem('ranktop5team'))
      console.log(newTeam);
      
      const saveID = this.userService.usuarios.usuario_id
      let found = newTeam.find(function (element) {
        return element.capitan_id === saveID;
      });
      console.log(found);

      const isLargeNumber = (element) => element.capitan_id === saveID;
      this.yourRankTopTeam = found
      const saveYourTop = newTeam.findIndex(isLargeNumber) + 1
      this.yourNumberTopTeam = saveYourTop
      console.log(this.yourNumberTopTeam);
      
    });
  }

  ngOnInit(): void {
    this.rankTop10();
    this.rankTop5Team();
    this.findTopOne();
    this.findYourTop();
    this.getTeamsById();
    this.isLoggedIn();
    this.userService.usersRank = JSON.parse(localStorage.getItem('ranktop10'));
    this.dataTop10 = this.userService.usersRank;
    this.userService.teamRank = JSON.parse(localStorage.getItem('ranktop5team'))
    this.dataTeamTop5 = this.userService.teamRank;
    this.topOne = this.userService.userTopOne
    this.serviceTitle.setTitle(this.title);
  }
}
