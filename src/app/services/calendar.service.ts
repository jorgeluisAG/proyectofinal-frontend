import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CalendarService {
    private projectUrl = `${environment.projectEndpoint}/calendar`;
    headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    constructor(
        private http: HttpClient
    ) {
    }

    getListCalendarUser(idUser: number): Observable<HttpResponse<any>> {
        let url=`${this.projectUrl}/list/${idUser}`;
        return this.http.get(url ,{
            observe: 'response',
            headers: this.headers
        });
    };


    postCalendarUser(caledarUser: any): Observable<HttpResponse<any>> {
      let url=`${this.projectUrl}/confirm/`;
      return this.http.post(url,caledarUser ,{
          observe: 'response',
          headers: this.headers
      });
    };

    getEmployeesWorkCalendarAll(): Observable<HttpResponse<any>> {
      return this.http.get(`${this.projectUrl}/list/all`, {headers: this.headers, observe: 'response'});
    };
}
