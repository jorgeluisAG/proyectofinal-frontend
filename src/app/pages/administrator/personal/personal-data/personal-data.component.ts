import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import { Person } from 'src/app/model/Person';
import { PersonalService } from 'src/app/services/personal.service';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/shared/loader';
import Swal from 'sweetalert2';

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
  direccionPut= '';

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

  updatePersonals(){
    if(this.direccionPut!=''){
      let address: AddressDTO={
        id: 0,
        description: this.direccionPut,
        status: true
      }
      this.personalOne.addressRequests.push(address);
    }else{
      let address: AddressDTO={
        id: 0,
        description: 'La Paz, El Alto',
        status: true
      }
      this.personalOne.addressRequests.push(address);
    }
    this.userService.updateUserCustomer(this.personalOne)
    .subscribe((resp: HttpResponse<any>) => {
      Swal.fire({
        title: 'Gestión de Empleado',
        text: 'Empleado Actualizado correctamente',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: "Cerrar",
        customClass: {
            confirmButton: 'btn btn-primary'
        }
      }).then(r => {
        //$('#kt_modal_update_profile').modal('hide');
        this.router.navigate(['/personales']);
      });
    }, error => {
      Swal.fire({
        title: 'Error al Actualizar el Empleado',
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

  getPersonalById(){
    this.loader.startLoading('Cargando...');
    this.userService.getUserDate(this.id)
        .subscribe((resp) => {
          this.personalOne = resp.body;
          console.log(this.personalOne);
        });
  }

}
