import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { tap, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8000/usuarios"
  public User:User;
  public usuarios:User;
  public usersBan: User[];
  public userBan:User;
  public collection: User[];
  public allusers: User[];
  public receptor:User;
  constructor(private http: HttpClient, private router: Router, private auth:AuthService) { }

  

  isBanned() {
    this.getUserAll().subscribe((data: User[]) => {
      this.usersBan = data;
      localStorage.setItem(
        'allusersban',
        JSON.stringify(this.usersBan)
      );
      this.usersBan = JSON.parse(localStorage.getItem('allusers'));
      let peta = JSON.parse(localStorage.getItem('allusers'));
      this.usersBan = this.usersBan;
      if (this.auth.isLoggedIn() === true) {
        let usuario_id = this.usuarios.usuario_id;
        this.getUserByID(usuario_id).subscribe((data) => {
          this.User = data[0];
          let convert = JSON.stringify(this.User);
          let search = JSON.parse(convert);
          if (search.isBanned === 1) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Lo sentimos, estas baneado',
              showConfirmButton: false,
              timer: 2000,
            });
            localStorage.clear();
            this.router.navigateByUrl('/');
          } else {
            console.log('No estas baneado');
          }
        });
      } else {
        console.log('No estas logeado!');
      }
    });
  }

  putisBanned(newBan:any){
    return this.http.put(this.url + "/ban", newBan)
  }


  getUsers(){
    return this.http.get<any>(this.url).pipe(
      map(usuarios =>{
        const newUsuarios = []
        for (let usuario of usuarios){
          const email = usuario.email;
          const nickname = usuario.nickname;
          newUsuarios.push({correo: email, nickname: nickname})
        }
        
        return newUsuarios
      }),
      tap(usuarios => console.log(usuarios))
    );
  }

  getUserByEmail(email:string){
    return this.http.get<any>(this.url + "/correo/" +email);
  }
  getUserByNickname(nickname:string){
    return this.http.get<any>(this.url + "/nickname/" +nickname);
  }

  getUserByID(id:number){
    return this.http.get(this.url + "/" + id)
  }

  login(usuario:User){
    return this.http.post(this.url + "/login", usuario)
  }

  getUserAll(){
    return this.http.get(this.url)
  }

  postUser(newUser:User){
    return this.http.post(this.url, newUser)
  }

  putUser(editUser:User){
    return this.http.put(this.url, editUser)
  }

  deleteUser(id:number){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        usuario_id: id
      },
    }
    return this.http.delete(this.url, options)
  }

 
}
