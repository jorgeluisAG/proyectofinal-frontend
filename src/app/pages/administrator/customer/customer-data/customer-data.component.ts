import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import { Person } from 'src/app/model/Person';
import { CustomerService } from 'src/app/services/customer.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit {

  id: number;
  person: Person = new Person(0,'','','','','','',true)
  authority: Authority = new Authority('')
  addressrequests: Array<AddressDTO> = [];
  customerOne: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);

  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private userService: UserService,
    private router: Router,
  ) {
    activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });
   }

  ngOnInit(): void {
    this.getCustomerById();
  }

  returnCustomers(){
    this.router.navigate(['/clientes'])
  }

  getCustomerById(){
    this.loader.startLoading('Cargando...');
    this.userService.getUserDate(this.id)
        .subscribe((resp) => {
          this.customerOne = resp.body;
          console.log(this.customerOne);
        });
  }


}
