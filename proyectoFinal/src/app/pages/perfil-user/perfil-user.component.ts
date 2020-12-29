import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { EncrDecrServiceService } from 'src/app/shared/encr-decr-service.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { G2pService } from 'src/app/shared/g2p.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent implements OnInit {
  @ViewChild('closeEdit') closeEdit;
  @ViewChild('closeDelete') closeDelete;
  imgSrc2 = 'assets/images/logo.png';
  title = 'Perfil - G2P';
  public g2pUserPerfil: User;
  public userall: User[];
  public typeUser: string;
  public usercito: User;
  public userlogin: boolean;
  public adminlogin: boolean;
  public nationalitiesEdit: string[];
  public msg: string;
  public urlf: any;
  public myFormEdit: FormGroup;
  public filename: string;
  public FormData: FormData;
  public selectedFile: File; //para cargar la foto
  uploadedFiles: Array<File>;
  constructor(
    private http: HttpClient,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public EncrDecr: EncrDecrServiceService,
    private G2PService: G2pService,
    private router: Router,
    private serviceTitle: Title,
    private auth: AuthService
  ) {
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
    this.buildForm();
    this.typeUser = 'user';
    this.msg = '';
    this.userlogin = false;
    this.adminlogin = false;
    this.urlf = '';
    this.usercito = this.userService.usuarios;
    this.g2pUserPerfil = this.userService.usuarios;
    this.selectedFile = null;
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  private buildForm() {
    const minPassLength = 8;
    const maxPassLength = 20;
    this.myFormEdit = this.formBuilder.group(
      {
        contrasenaEdit: [
          '',
          [
            Validators.minLength(minPassLength),
            Validators.maxLength(maxPassLength),
          ],
        ],
        repetir_contrasenaEdit: [
          '',
          RxwebValidators.compare({ fieldName: 'contrasenaEdit' }),
        ],
      },
      {
        validators: this.checkPasswords,
      }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let passEdit = group.controls.contrasenaEdit.value;
    let confirmPassEdit = group.controls.repetir_contrasenaEdit.value;

    return passEdit === confirmPassEdit ? null : { notSame: true };
  }

  editUser(
    usuario_id: any,
    nickname: string,
    nombre: string,
    apellido: string,
    nacimiento: any,
    correo: string,
    nacionalidad: string,
    biografia: string,
    contrasena: { toString: () => string }
  ) {
    let encrypted = this.EncrDecr.set('123456$#@$^@1ERF', contrasena);
    let userImageUrl;
    let oldImage;
    let localImg;
    if (nickname == '') {
      nickname = this.g2pUserPerfil.nickname;
    } else {
      this.g2pUserPerfil.nickname = nickname;
      localStorage.setItem('nickname', nickname);
    }
    if (nombre == '') {
      nombre = this.g2pUserPerfil.nombre;
    } else {
      this.g2pUserPerfil.nombre = nombre;
      localStorage.setItem('nombre', nombre);
    }
    if (apellido == '') {
      apellido = this.g2pUserPerfil.apellido;
    } else {
      this.g2pUserPerfil.apellido = apellido;
      localStorage.setItem('apellido', apellido);
    }
    if (this.uploadedFiles === null) {
      userImageUrl = this.g2pUserPerfil.url_perfil;
    } else {
      oldImage = this.g2pUserPerfil.url_perfil;
      oldImage = oldImage.replace(this.g2pUserPerfil.url_perfil, '');
      let now = new Date();
      let secret = now.getTime();
      userImageUrl = nombre + usuario_id + secret + nickname + '.jpg';
      localImg = 'assets/images/' + userImageUrl;
      this.g2pUserPerfil.url_perfil = localImg;
      localStorage.setItem('url_perfil', localImg);
      console.log(userImageUrl);
    }
    if (nacimiento == '') {
      nacimiento = this.g2pUserPerfil.nacimiento;
    } else {
      this.g2pUserPerfil.nacimiento = nacimiento;
      localStorage.setItem('nacimiento', nacimiento);
    }
    if (correo == '') {
      correo = this.g2pUserPerfil.correo;
    } else {
      this.g2pUserPerfil.correo = correo;
      localStorage.setItem('correo', correo);
    }
    if (nacionalidad == '') {
      nacionalidad = this.g2pUserPerfil.nacionalidad;
    } else {
      this.g2pUserPerfil.nacionalidad = nacionalidad;
      localStorage.setItem('nacionalidad', nacionalidad);
    }
    if (biografia == '') {
      biografia = this.g2pUserPerfil.biografia;
    } else {
      this.g2pUserPerfil.biografia = biografia;
      localStorage.setItem('biografia', biografia);
    }
    if (contrasena == '') {
      contrasena = this.g2pUserPerfil.contrasena;
    } else {
      // this.usuario.contrasena = contrasena
      this.g2pUserPerfil.contrasena = encrypted;
      localStorage.setItem('contrasena', encrypted);
    }
    console.log(this.g2pUserPerfil);
    let formData = new FormData();
    const nombreFoto = userImageUrl;
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('uploads[]', this.uploadedFiles[i], nombreFoto);
    }
    this.G2PService.uploadImg(formData).subscribe((response) => {
      console.log('response received is ', response);
    });
    this.userService.putUser(this.g2pUserPerfil).subscribe((data: User) => {
      console.log(this.g2pUserPerfil);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos modificados correctamente!',
        showConfirmButton: false,
        timer: 2500,
      });
      localStorage.setItem(
        'usuario',
        JSON.stringify(this.userService.usuarios)
      );
      console.log(localStorage.getItem('usuario'));
      this.closeEdit.nativeElement.click();
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(parseInt(id)).subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Perfil eliminado correctamente!',
        showConfirmButton: false,
        timer: 2500,
      });
      this.closeEdit.nativeElement.click();
      this.closeDelete.nativeElement.click();
      this.auth.logout();
    });
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  getall() {
    this.userService.getUserAll().subscribe((data: User[]) => {
      this.userall = data;
    });
  }

  access() {
    if (this.isLoggedIn() && this.g2pUserPerfil != null) {
      return true;
    } else if (!this.isLoggedIn() && this.g2pUserPerfil === null) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No tienes permiso para entrar aqui',
        showConfirmButton: false,
        timer: 2000,
      });
      this.router.navigateByUrl('/');
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title);
    this.userService.usuarios = JSON.parse(localStorage.getItem('usuario'));
    this.isLoggedIn();
    this.getall();
    this.access();
    this.g2pUserPerfil = this.userService.usuarios;
    this.usercito = this.userService.usuarios;
    this.serviceTitle.setTitle(this.title);
  }
}
