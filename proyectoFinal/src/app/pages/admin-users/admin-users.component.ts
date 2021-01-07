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
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  @ViewChild('deleteAdmin') deleteAdmin;
  @ViewChild('editAdmin') editAdmin;
  public title: string;
  public nationalitiesEdit: string[];
  public typeUser: string;
  public userlogin: boolean;
  public adminlogin: boolean;
  public g2pUserPerfil: User;
  public userall: User[];
  public indexEdit: number;
  public indexDelete: number;
  public notBan: boolean;
  public yesBan: boolean;
  public vertodo: boolean;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    public EncrDecr: EncrDecrServiceService,
    private router: Router,
    private serviceTitle: Title,
    private auth: AuthService
  ) {
    this.title = 'ADM - USUARIOS';
    this.nationalitiesEdit = [
      'Panama',
      'Colombia',
      'Costa Rica',
      'Honduras',
      'Brazil',
      'Argentina',
      'Bolivia',
      'Cuba',
      'El Salvador',
      'Ecuador',
      'Guatemala',
      'Jamaica',
      'Mexico',
      'Nicaragua',
      'Paraguay',
      'Peru',
      'Puerto Rico',
      'Espana',
      'Estados Unidos',
      'Uruguay',
      'Venezuela',
      'Portugal',
      'China',
      'Republica Dominicana',
    ];
    this.typeUser = 'user';
    this.userlogin = false;
    this.adminlogin = false;
    this.g2pUserPerfil = this.userService.usuarios;
    this.userall = this.userService.collection;
    this.indexEdit = 0;
    this.indexDelete = 0;
    this.notBan = false;
    this.yesBan = false;
    this.vertodo = false;
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  adminUser() {
    this.userService.getUserAll().subscribe((data: User[]) => {
      this.userService.collection = data;
      this.userall = this.userService.collection;
      localStorage.setItem('adminuser', JSON.stringify(this.userall));
    });
  }

  isYesBan() {
    this.vertodo = true;
  }

  banned(userid: number, findIndex: number) {
    console.log(userid);
    let finBand = JSON.parse(localStorage.getItem('allusers'));
    if (finBand[findIndex].isBanned === 0) {
      console.log(finBand[findIndex].isBanned);
      let json = { isBanned: 1, usuario_id: userid };
      this.userService.putisBanned(json).subscribe((data) => {
        console.log(data);
        this.userService.getUserByID(userid).subscribe((data) => {
          let found = data[0];
          this.userall.splice(findIndex, 1, found);
          localStorage.setItem('adminuser', JSON.stringify(this.userall));
          this.editAdmin.nativeElement.click();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario baneado correctamente!',
            showConfirmButton: false,
            timer: 2500,
          });
        });
      });
    } else {
      console.log('No estas baneado');
    }
    if (finBand[findIndex].isBanned === 1) {
      let json2 = { isBanned: 0, usuario_id: userid };
      this.userService.putisBanned(json2).subscribe((data) => {
        console.log(data);
        this.userService.getUserByID(userid).subscribe((data) => {
          let found = data[0];
          this.userall.splice(findIndex, 1, found);
          localStorage.setItem('adminuser', JSON.stringify(this.userall));
          this.editAdmin.nativeElement.click();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario desbaneado correctamente!',
            showConfirmButton: false,
            timer: 2500,
          });
        });
      });
    } else {
      console.log('JAJA');
    }
    console.log(this.userall[findIndex]);
  }

  deleteUser(id: any, id2: any) {
    this.userService.deleteUser(parseInt(id)).subscribe((data) => {
      if (data === true) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un error, por favor solucionalo',
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        this.deleteAdmin.nativeElement.click();
        this.userall.splice(id2, 1);
        localStorage.setItem('adminuser', JSON.stringify(this.userall));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Perfil eliminado correctamente!',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
    // window.location.reload()
  }

  public displayEdit(i: number) {
    this.indexEdit = i;
    console.log(this.indexEdit);

    let peta = JSON.parse(localStorage.getItem('adminuser'));
    console.log(peta);

    if (peta[i].isBanned === 0) {
      console.log(peta[i].isBanned);
      this.notBan = true;
    } else {
      this.notBan = false;
    }
    if (peta[i].isBanned === 1) {
      this.yesBan = true;
    } else {
      this.yesBan = false;
    }
  }

  public displayDelete(i: number) {
    this.indexDelete = i;
  }

  noAdmin() {
    if (this.isLoggedIn() && this.g2pUserPerfil.admin === 'admin') {
      console.log('hola');
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

  ngOnInit(): void {
    this.adminUser();
    this.serviceTitle.setTitle(this.title);
    this.userService.usuarios = JSON.parse(localStorage.getItem('usuario'));
    this.g2pUserPerfil = this.userService.usuarios;
    this.userService.collection = JSON.parse(localStorage.getItem('adminuser'));
    this.userall = this.userService.collection;
    this.isLoggedIn();
    this.noAdmin();
    this.isYesBan();
  }
}
