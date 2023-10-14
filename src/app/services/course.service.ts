import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    private projectUrl = `${environment.projectEndpoint}/course`;
    constructor(
        private http: HttpClient
    ) {
    }

    getListCourseRegister(registerId: String): Observable<HttpResponse<any>> {
        let url=`${this.projectUrl}/list/${registerId}`;

        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token_v2')}`);
        return this.http.get(url ,{
            observe: 'response',
            headers
        });
    };
}
