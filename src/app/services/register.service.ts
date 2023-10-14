import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    private proyectUrl = `${environment.projectEndpoint}/register`;
    constructor(
        private http: HttpClient
    ) {
    }

    getCourseByCourseIdAndYearId(courseId: String,yearId: String): Observable<HttpResponse<any>> {
        let url=`${this.proyectUrl}/list/student/${courseId}/${yearId}`;

        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
        return this.http.get(url ,{
            observe: 'response',
            headers
        });
    };
}
