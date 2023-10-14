import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private projectUrl = `${environment.projectEndpoint}/user`;
    private header = new HttpHeaders().set('Content-Type', 'application/json')
    constructor(
        private http: HttpClient
    ) {
    }

    getUserDate(userId: Number): Observable<HttpResponse<any>> {
        let url=`${this.projectUrl}/${userId}`;
        //let url=`${this.projectUrl}/2`;
        console.log(url)
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        //.set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
        return this.http.get(url ,{
            observe: 'response',
            headers
        });
    };

    getUserAll(): Observable<HttpResponse<any>> {
      return this.http.get(`${this.projectUrl}`, {headers: this.header, observe: 'response'});
    };
}
