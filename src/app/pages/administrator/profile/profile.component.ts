import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { delay} from "rxjs/operators";
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { Person } from '../../../model/Person';
import { Address } from '../../../model/Address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    person: Person = new Person(0,'','','','','',0)
    address: Address = new Address(0,'')
    user: User = new User(0,'','','','','','',this.person,this.address);
    userUpdated: User = new User(0,'','','','','','',this.person,this.address);
    // userUpdated: User[] = [];
    constructor(

        private userService: UserService,

    ) { }

    ngOnInit(): void {
        this.getDateUser();
    }




    getDateUser(){
        //this.userService.getUserDate("13d96253-3048-4e93-ba50-28512be4fcfd")
        this.userService.getUserDate(2)
            .subscribe((resp: HttpResponse<any>) => {
                this.user = resp.body;
        });

    }

    getFullName() {
        let val = this.user.person.firstName + ' ' + this.user.person.lastName;
        return val;
    }

    changePassword(){

    }

    updateUser(){

    }


}
