import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ConductService {
    private proyectUrl = `${environment.projectEndpoint}/conduct`;
    constructor(
        private http: HttpClient
    ) {
    }

    getListConductRegister(registerId: String,courseId: String): Observable<HttpResponse<any>> {
        let url=`${this.proyectUrl}/student/${registerId}/${courseId}`;

        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
        return this.http.get(url ,{
            observe: 'response',
            headers
        });
    };
}
