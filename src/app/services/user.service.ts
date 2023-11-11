import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserCreateDTO } from '../model/DTO/UserCreateDTO';
import { UserCreateNewDTO } from '../model/DTO/UserCreateNewDTO';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private projectUrl = `${environment.projectEndpoint}/user`;
    private header = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    constructor(
        private http: HttpClient
    ) {
    }

    getUserDate(userId: Number): Observable<HttpResponse<any>> {
        let url=`${this.projectUrl}/${userId}`;
        return this.http.get(url ,{
            observe: 'response',
            headers: this.header
        });
    };

    getUserAll(): Observable<HttpResponse<any>> {
      return this.http.get(`${this.projectUrl}`, {headers: this.header, observe: 'response'});
    };


    createNewUserByConfirm(user: UserCreateDTO): Observable<HttpResponse<any>> {
      //const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(`${this.projectUrl}/confirm/`,user, {headers: this.header, observe: 'response'});
    }

    putImagenUser(imageUser: any): Observable<HttpResponse<any>> {
      return this.http.put(`${this.projectUrl}/image/update`,imageUser, {headers: this.header, observe: 'response'});
    }

    updateUser(user: UserCreateNewDTO): Observable<HttpResponse<any>> {
      //const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.put(`${this.projectUrl}/change/`, user, {headers: this.header, observe: 'response'});
    }

    updateUserCustomer(user: UserCreateNewDTO): Observable<HttpResponse<any>> {
      //const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.put(`${this.projectUrl}/change/customer`, user, {headers: this.header, observe: 'response'});
    }

    deleteUserById(id: number) {
      return this.http.delete(`${this.projectUrl}/deleted/${id}`, {headers: this.header, observe: 'response'});
    }

    deleteCustomerById(id: number) {
      return this.http.delete(`${this.projectUrl}/deleted/${id}`, {headers: this.header, observe: 'response'});
    }
    deletePersonalById(id: number) {
      return this.http.delete(`${this.projectUrl}/deleted/${id}`, {headers: this.header, observe: 'response'});
    }
}
