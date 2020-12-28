import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { EncrDecrServiceService } from 'src/app/shared/encr-decr-service.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  @ViewChild('deleteAdmin') deleteAdmin;
  public title: string;
  public nationalitiesEdit: string[];
  public typeUser: string;
  public userlogin: boolean;
  public adminlogin: boolean;
  public usercito: User;
  public g2pUserPerfil: User;
  public userall: User[];
  public myIndex: number;

  constructor(public userService: UserService, private formBuilder: FormBuilder, public EncrDecr: EncrDecrServiceService, private router: Router, private serviceTitle: Title, private auth: AuthService) {
    this.title = 'ADM - USUARIOS';
    this.nationalitiesEdit = ['Panama', 'Colombia', 'Costa Rica', 'Honduras', 'Brazil', 'Argentina', 'Bolivia', 'Cuba', 'El Salvador', 'Ecuador', 'Guatemala', 'Jamaica', 'Mexico', 'Nicaragua', 'Paraguay', 'Peru', 'Puerto Rico', 'Espana', 'Estados Unidos', 'Uruguay', 'Venezuela', 'Portugal', 'China', 'Republica Dominicana'];
    this.typeUser = 'user';
    this.userlogin = false;
    this.adminlogin = false;
    this.usercito = this.userService.usuarios;
    this.userall = this.userService.collection
    this.g2pUserPerfil = this.userService.usuarios;
    this.adminUser();
    this.myIndex = 0;
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  adminUser() {
    this.userService.getUserAll().subscribe((data: User[]) => {
      this.userService.collection = data;
      localStorage.setItem('adminuser', JSON.stringify(this.userService.collection));
    })
  }

  deleteUser(id: any, id2: any) {
    this.userService.deleteUser(parseInt(id)).subscribe((data) => {
      this.deleteAdmin.nativeElement.click();
      this.userall.splice(id2, 1);
      localStorage.setItem('adminuser', JSON.stringify(this.userall))
      this.userall = this.userService.collection
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Perfil eliminado correctamente!',
        showConfirmButton: false,
        timer: 2500
      });
    })
    window.location.reload()
  }

  public displayInfo(i: number) {
    this.myIndex = i
  }

  noAdmin() {
    if (this.isLoggedIn() && this.g2pUserPerfil.admin === "admin") {
      console.log("hola");
      return true
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No tienes permiso para entrar aqui',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl('/');
      return false
    }
  }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title);
    this.userService.usuarios = JSON.parse(localStorage.getItem('usuario'));
    this.g2pUserPerfil = this.userService.usuarios;
    this.userService.collection = JSON.parse(localStorage.getItem('adminuser'));
    this.userall = this.userService.collection;
    this.isLoggedIn();
    this.noAdmin();
  }
}
