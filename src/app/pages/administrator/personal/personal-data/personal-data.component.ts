import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import { Person } from 'src/app/model/Person';
import { PersonalService } from 'src/app/services/personal.service';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/shared/loader';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  id: number;
  person: Person = new Person(0,'','','','','','',true)
  authority: Authority = new Authority('')
  addressrequests: Array<AddressDTO> = [];
  personalOne: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);

  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private personalService: PersonalService,
    private userService: UserService,
    private router: Router,
  ) {
    activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });
   }

  ngOnInit(): void {
    this.getPersonalById();
  }

  returnPersonals(){
    this.router.navigate(['/personales'])
  }

  getPersonalById(){
    this.loader.startLoading('Cargando...');
    this.userService.getUserDate(this.id)
        .subscribe((resp) => {
          this.personalOne = resp.body;
          console.log(this.personalOne);
        });
  }

}
