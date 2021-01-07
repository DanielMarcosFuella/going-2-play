import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.css']
})
export class AdminTeamsComponent implements OnInit {
  title = 'ADM - EQUIPOS'
  public adminTeams:[]
  constructor(public userService: UserService, private serviceTitle:Title) {
    this.adminTeams = this.userService.adminTeams
   }

  getAllTeams(){
    this.userService.getTeams().subscribe((data:[])=>{
      console.log(data);
      this.userService.adminTeams = data
      this.adminTeams = this.userService.adminTeams
      localStorage.setItem('adminteams', JSON.stringify(this.adminTeams))


      

      
    })
  }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title)
    this.getAllTeams()

  }
}
