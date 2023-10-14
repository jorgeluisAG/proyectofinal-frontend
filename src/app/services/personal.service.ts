import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class PersonalService {
  private projectUrl = `${environment.projectEndpoint}/user`;
  private header = new HttpHeaders().set('Content-Type', 'application/json')
        // .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
  constructor(
    private http: HttpClient
  ) { }

  getPersonalAll(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.projectUrl}`, {headers: this.header, observe: 'response'});
  };




}
