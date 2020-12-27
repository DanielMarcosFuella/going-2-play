import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8000/usuarios"
  public usuarios:User;
  public collection: User[]
  public receptor:User;
  constructor(private http: HttpClient) { }

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
