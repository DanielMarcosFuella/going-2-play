import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { element } from 'protractor';
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
  public topOne:User;
  public teamTopOne:any;
  public yourNumberTop:number;
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

    this.user = true;
    this.userlogin = false
  }

  goPerfil(nickname: string) {
    this.router.navigateByUrl(
      '/perfil?nickname=' + nickname
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
      console.log(data);
      
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
    console.log(data[0]);
    
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

  ngOnInit(): void {
    this.rankTop10();
    this.rankTop5Team();
    this.findTopOne();
    this.findYourTop();
    this.isLoggedIn();
    this.userService.usersRank = JSON.parse(localStorage.getItem('ranktop10'));
    this.dataTop10 = this.userService.usersRank;
    this.userService.teamRank = JSON.parse(localStorage.getItem('ranktop5team'))
    this.dataTeamTop5 = this.userService.teamRank;
    this.topOne = this.userService.userTopOne
    this.serviceTitle.setTitle(this.title);
    console.log(this.dataTeamTop5);
    
    
  }
}
