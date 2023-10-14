import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private proyectUrl = `${environment.projectEndpoint}`;
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
        // this.userService.getUserDate("13d96253-3048-4e93-ba50-28512be4fcfd")
        //     .subscribe((resp: HttpResponse<any>) => {
        //         this.user = resp.body;
        //         console.log(this.user)
        // });
    }

    logout() {
    }
}
