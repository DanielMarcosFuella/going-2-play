import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { G2pService } from 'src/app/shared/g2p.service';
import { Reglas } from 'src/app/models/reglas';


@Component({
  selector: 'app-admin-reglas',
  templateUrl: './admin-reglas.component.html',
  styleUrls: ['./admin-reglas.component.css']
})
export class AdminReglasComponent implements OnInit {
  @ViewChild('deleteRules') deleteRules;
  public title: string;
  public modojuego: string[];
  public listajuegos: string[];
  public userlogin: boolean;
  public adminlogin: boolean;
  public g2pUserPerfil: User;
  public rulesall: Reglas[];
  public hola: any;
  public myIndex: number;

  constructor(public userService: UserService, private formBuilder: FormBuilder, private router: Router, private serviceTitle: Title, private auth: AuthService, private G2PService: G2pService) {
    this.title = 'ADM - REGLAS';
    this.modojuego = ['1 VS 1', '2 VS 2', '5 VS 5', '11 VS 11'];
    this.listajuegos = ['LOL', 'FIFA'];
    this.userlogin = false;
    this.adminlogin = false;
    this.g2pUserPerfil = this.userService.usuarios;
    this.rulesall = this.G2PService.reglas;
    this.myIndex = 0;
  }

  

  isLoggedIn() {
    this.userlogin = this.auth.isLoggedIn();
    return this.userlogin;
  }

  noAdmin() {
    if (this.isLoggedIn() && this.g2pUserPerfil.admin === "admin") {
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

  getRules() {
    let lol: any = "LOL"
    let fifa: any = "FIFA"
    this.G2PService.getAllReglas().subscribe((data: Reglas[]) => {
      this.G2PService.reglas = data
      localStorage.setItem('adminrules', JSON.stringify(this.G2PService.reglas));
      for (let i = 0; i < this.G2PService.reglas.length; i++) {
        if (JSON.parse(localStorage.getItem('adminrules'))[i].juego_id === 1) {
          this.G2PService.reglas[i].juego_id = lol;
          localStorage.setItem('juego_id', this.G2PService.reglas[i].juego_id);
          localStorage.setItem('adminrules', JSON.stringify(this.G2PService.reglas));
        }
        if (JSON.parse(localStorage.getItem('adminrules'))[i].juego_id === 2) {
          this.G2PService.reglas[i].juego_id = fifa;
          localStorage.setItem('juego_id', this.G2PService.reglas[i].juego_id);
          localStorage.setItem('adminrules', JSON.stringify(this.G2PService.reglas));
        }
      }
    })
  }

  addRules(modo: string, juego_id: number, descripcion: any) {
    let lol: any = "LOL"
    let fifa: any = "FIFA"
    this.G2PService.regla = new Reglas(null, modo, juego_id, descripcion)
    this.rulesall.push(this.G2PService.regla);
    this.G2PService.postReglas(new Reglas(this.hola, modo, juego_id, descripcion)).subscribe((data: any) => {
      this.hola = data.insertId
      localStorage.setItem('adminrules', JSON.stringify(this.rulesall))
      for (let j = 0; j < this.rulesall.length; j++) {
        if (JSON.parse(localStorage.getItem('adminrules'))[j].reglas_id === null) {
          this.rulesall[j].reglas_id = this.hola;
          localStorage.setItem('reglas_id', this.rulesall[j].reglas_id);
          localStorage.setItem('adminrules', JSON.stringify(this.rulesall));
        }
        if (JSON.parse(localStorage.getItem('adminrules'))[j].juego_id === "1") {
          this.rulesall[j].juego_id = lol;
          localStorage.setItem('juego_id', this.rulesall[j].juego_id);
          localStorage.setItem('adminrules', JSON.stringify(this.rulesall));
        }
        if (JSON.parse(localStorage.getItem('adminrules'))[j].juego_id === "2") {
          this.rulesall[j].juego_id = fifa;
          localStorage.setItem('juego_id', this.rulesall[j].juego_id);
          localStorage.setItem('adminrules', JSON.stringify(this.rulesall));
        }
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Regla creada correctamente!',
        showConfirmButton: false,
        timer: 2500
      });
    })
  }

  deleteRule(id: any, id2: any) {
    this.G2PService.deleteReglas(parseInt(id)).subscribe((data) => {
      this.deleteRules.nativeElement.click();
      this.rulesall.splice(id2, 1);
      localStorage.setItem('adminrules', JSON.stringify(this.rulesall))
      console.log(this.rulesall);
      console.log(this.G2PService.reglas);
      
      // this.rulesall = 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Perfil eliminado correctamente!',
        showConfirmButton: false,
        timer: 2500
      });
    })
    // window.location.reload()

  }

  public getData(i: number) {
    this.myIndex = i
    console.log(this.myIndex);
    
  }

  ngOnInit(): void {
    this.serviceTitle.setTitle(this.title);
    this.userService.usuarios = JSON.parse(localStorage.getItem('usuario'));
    this.g2pUserPerfil = this.userService.usuarios;
    this.G2PService.reglas = JSON.parse(localStorage.getItem('adminrules'));
    this.rulesall = this.G2PService.reglas;
    this.isLoggedIn();
    this.noAdmin();
    this.getRules()

  }
}
