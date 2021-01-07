import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Torneo } from '../models/torneo';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  private url = "http://localhost:8000/";
  private urlIMG = "http://localhost:3000/";
  public torneo: Torneo;
  public torneoArray: Torneo[];

  constructor(private http: HttpClient) { }

  getTorneoByID(id:any) {
    return this.http.get(this.url + "torneo/?id=" + id)
  }

}
