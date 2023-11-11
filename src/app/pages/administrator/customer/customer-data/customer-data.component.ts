import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import { Person } from 'src/app/model/Person';
import { CustomerService } from 'src/app/services/customer.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  direccionPut= '';

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

  returnCustmers(){
    this.router.navigate(['/clientes']);
  }
  updateCustomers(){
    if(this.direccionPut!=''){
      let address: AddressDTO={
        id: 0,
        description: this.direccionPut,
        status: true
      }
      this.customerOne.addressRequests.push(address);
    }else{
      let address: AddressDTO={
        id: 0,
        description: 'La Paz, El Alto',
        status: true
      }
      this.customerOne.addressRequests.push(address);
    }
    this.userService.updateUserCustomer(this.customerOne)
        .subscribe((resp: HttpResponse<any>) => {
          Swal.fire({
            title: 'Gestión de Cliente',
            text: 'Cliente Actualizado correctamente',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: "Cerrar",
            customClass: {
                confirmButton: 'btn btn-primary'
            }
          }).then(r => {
            //$('#kt_modal_update_profile').modal('hide');
            this.router.navigate(['/clientes']);
          });
        }, error => {
          Swal.fire({
            title: 'Error al Actualizar el Cliente',
            text: 'Intente nuevamente',
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: "Cerrar",
            customClass: {
                confirmButton: 'btn btn-danger'
            }
        }).then(r => {});
      });

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
