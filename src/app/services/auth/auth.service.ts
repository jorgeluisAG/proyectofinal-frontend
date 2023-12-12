import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { ResetPasswordDTO } from 'src/app/model/DTO/ResetPasswordDTO';
import { Images } from '../../model/Images';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private projectUrl = `${environment.projectEndpoint}`;
    cryptoJS = require("crypto-js");
    // @ts-ignore
    user: User;
    // @ts-ignore
    token: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private userService: UserService,
    ) {
        this.loadStorage();
    }

    loadStorage(){
      if (localStorage.getItem('token')) {
        // @ts-ignore
        this.token = localStorage.getItem('token');
            if(localStorage.getItem('user')){
                // @ts-ignore
                this.user = localStorage.getItem('user');
            }

    } else {
        this.token = '';
        this.user = [];
    }
        // this.userService.getUserDate("13d96253-3048-4e93-ba50-28512be4fcfd")
        //     .subscribe((resp: HttpResponse<any>) => {
        //         this.user = resp.body;
        //         console.log(this.user)
        // });
    }

    logout() {
      this.user = [];
        // this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('dataUser');
        this.router.navigate(['login']).then(r => {});
    }

    getUser() {
      return this.user;
    }
    login(data: any): Observable<HttpResponse<any>> {
      let url = `${this.projectUrl}/api/authenticate`
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(url, data, {headers: headers, observe: 'response'});
    }

    saveLogin(user: any, token: string): any {
      localStorage.setItem('token', token);
      localStorage.setItem('rol', user.authority.id);
      localStorage.setItem('dataUser', JSON.stringify(user));
      localStorage.setItem('imagUser', user.imageUser);
      this.user = user;
      this.token = token;

    }

    isLogged() {
      return (this.token.length > 5);
     }

    changePassword(resetPasswordDTO: ResetPasswordDTO): Observable<HttpResponse<any>>{
      let url = `${this.projectUrl}/user/password/update`
      const headers1 = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return this.http.put(url, resetPasswordDTO, {headers: headers1, observe: 'response'})

    }

}
