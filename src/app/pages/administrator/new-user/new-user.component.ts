import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/shared/loader';
import Swal from 'sweetalert2';

declare var $: any;
declare var intlTelInput: any;
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  role: any;
  opcionesSelect= 'USER';
  userNameAdm = '';
  emailAdm = '';
  phoneNumberAdm = '';
  firstNameAdm = '';
  lastNameAdm = '';
  documentNumberAdm = '';
  birthdateAdm = '';
  direccionAdm = '';

  genderAdm: string;
  sexAlls: string[] = ["Hombre","Mujer"];




  constructor(
    private router: Router,
    private userService: UserService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('rol')
  }

  createAdministrator(){
    Swal.fire({
      title: 'Producto Creado',
      text: 'Producto Agregado correctamente',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: "Cerrar",
      customClass: {
          confirmButton: 'btn btn-primary'
      }
  }).then(r => {
    this.router.navigate(['/nuevo-usuario']);
      //$('#kt_modal_update_profile').modal('hide');
      // this.getUserById();
  });

  }
  createEmployee(){
    Swal.fire({
      title: 'Producto Creado',
      text: 'Producto Agregado correctamente',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: "Cerrar",
      customClass: {
          confirmButton: 'btn btn-primary'
      }
  }).then(r => {
    this.router.navigate(['/personales']);
      //$('#kt_modal_update_profile').modal('hide');
      // this.getUserById();
  });

  }
  createCustomer(){
    Swal.fire({
      title: 'Cliente creado exitosamente',
      text: 'Se creo los datos del cliente exitosament',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: "Cerrar",
      customClass: {
          confirmButton: 'btn btn-success'
      }
    }).then(r => {
      this.router.navigate(['/clientes'])
    });

  }


}
