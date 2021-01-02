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
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Location } from '@angular/common';


@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent implements OnInit {
  @ViewChild('closeEdit') closeEdit;
  @ViewChild('closeDelete') closeDelete;
  @ViewChild('gChart') gChart;
  imgSrc2 = 'assets/images/logo.png';
  title = 'Perfil - G2P';
  public g2pUserPerfil: User;
  public userall: User[];
  public typeUser: string;
  public userlogin: boolean;
  public adminlogin: boolean;
  public nationalitiesEdit: string[];
  public msg: string;
  public msg2: string;
  public urlf: any;
  public myFormEdit: FormGroup;
  public filename: string;
  public FormData: FormData;
  public selectedFile: File; //para cargar la foto
  uploadedFiles: Array<File>;
  // chart = [];

  public pieChartData: ChartDataSets[] = [
    {
      borderColor: '#fff',
      data: [20, 10, 9, 1],
      // backgroundColor: ['#ff09d6', '#dc3545', '#171c3e', '#0b0f2c'],
      // borderWidth: 0.5,
      label: 'Poppins',
    },
  ];

  public pieChartLabels: Label[] = [
    'JUGADAS',
    'GANADAS',
    'PERDIDAS',
    'EMPATADAS',
  ];
  public pieChartOptions: ChartOptions = {
    plugins: {
      datalabels: {
        color: '#fff',
      },
    },
    responsive: true,
    legend: {
      position: 'bottom',
      fullWidth: false,
      labels: {
        boxWidth: 15,
        fontColor: '#fff',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 10,
        padding: 25,
        usePointStyle: true,
      },
    },
    title: {
      display: false,
      text: '',
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  public pieChartColors: Color[] = [
    {
      backgroundColor: ['#0b0f2c', '#ff09d6', '#5f0505', '#171c3e'],
      borderColor: '#fff',
      borderWidth: 1,
    },
  ];

  public pieChartLegend = true;
  public pieChartType = 'pie';
  public pieChartPlugins = [];

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public EncrDecr: EncrDecrServiceService,
    private G2PService: G2pService,
    private router: Router,
    private serviceTitle: Title,
    private auth: AuthService,
    private link: Location

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
    this.msg2 = '';
    this.userlogin = false;
    this.adminlogin = false;
    this.urlf = '';
    this.g2pUserPerfil = this.userService.usuarios;
    this.selectedFile = null;
  }

  fileChange(element) {
    this.selectedFile = <File>element.target.files;
    console.log(this.selectedFile[0]);
    this.msg2 = this.selectedFile[0].name;
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
    if (this.selectedFile === null) {
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
      let formData = new FormData();
      const nombreFoto = userImageUrl;
      formData.append('uploads', this.selectedFile[0], nombreFoto);
      this.G2PService.uploadImg(formData).subscribe((response) => {
        console.log('response received is ', response);
      });
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
      if (data === true) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un error, contacta con un administrador',
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
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
      }
    });
  }

  isBanned(){
    this.userService.isBanned()
  }

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  getall() {
    this.userService.getUserAll().subscribe((data: User[]) => {
      this.userall = data;
      console.log(this.userall);
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

  shuffeData() {
    this.pieChartData = [
      {
        data: [20, 5, 6, 2],
        // backgroundColor: ['#ff09d6', '#dc3545', '#171c3e', '#0b0f2c'],
        borderColor: '#ffffff',
        // borderWidth: 0.5,
        label: 'Poppins',
      },
    ];
  }


  goBack() {
    // window.history.back();
    this.link.back();

    console.log('goBack()...');
  }

  goForward() {
    this.link.forward();
  }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title);
    this.userService.usuarios = JSON.parse(localStorage.getItem('usuario'));
    this.g2pUserPerfil = this.userService.usuarios;
    this.isLoggedIn();
    this.isBanned();
    this.getall();
    this.access();
    this.shuffeData();
    console.log(this.userService.usuarios.usuario_id);

    // this.chartLog()
  }
}
