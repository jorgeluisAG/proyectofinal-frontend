import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private projectUrl = `${environment.projectEndpoint}/product`;
  private header = new HttpHeaders().set('Content-Type', 'application/json')
        // .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
  constructor(
    private http: HttpClient
  ) { }

  getListProductRegister(registerId: String): Observable<HttpResponse<any>> {
    let url = `${this.projectUrl}/list/${registerId}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
      return this.http.get(url ,{
        observe: 'response',
        headers
      });
  };

  getProductAll(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.projectUrl}`, {headers: this.header, observe: 'response'});
  };

}
