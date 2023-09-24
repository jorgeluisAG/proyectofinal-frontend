import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.endpoint}/user`

  constructor(
    private http: HttpClient
  ){}

  getAllUser(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
        return this.http.get(this.url ,{
            observe: 'response',
            headers
        });
  }
}
