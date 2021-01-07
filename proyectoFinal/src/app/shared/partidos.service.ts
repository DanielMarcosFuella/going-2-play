import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Partidos } from '../models/partidos';


@Injectable({
  providedIn: 'root'
})
export class G2pService {

  private url = "http://localhost:8000/"
  private urlIMG = "http://localhost:3000/"
  public partido: Partidos;
  public partidos: Partidos[]
  public games: any = []
  constructor(private http: HttpClient) { }

  public uploadImg(fd: FormData){
    return this.http.post(this.urlIMG + "upload", fd)
  }

  getPartidosByID(id: number) {
    return this.http.get(this.url + "partidos/" + id)
  }

  getAllPartidos() {
    return this.http.get(this.url + "partidos/")
  }

  putPartidos(putPartidos: Partidos) {
    return this.http.put(this.url + "partidos/", putPartidos);
  }

  postPartidos(addpartidos: any) {
    return this.http.post(this.url + "partidos/", addpartidos)

  }

  deletepartidos(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        partidos_id: id
      },
    }
    return this.http.delete(this.url + "partidos/", options)
  }
}
