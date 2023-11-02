import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCreateDTO } from 'src/app/model/DTO/UserCreateDTO';
import { UserService } from '../../services/user.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Person } from 'src/app/model/Person';


declare var $: any;
declare var intlTelInput: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loginForm!: FormGroup
  person: Person = new Person(0,'','','','','','',true);
  user: UserCreateDTO = new UserCreateDTO('','',true,'',this.person);
  today = new Date();
  changedDate: string | null;
  pipe = new DatePipe('en-US');
  userName = '';
  email = '';
  firstName = '';
  lastName = '';
  password = '';
  sex = '';
  phone = '';
  birthdate = '';
  documentType = '';
  documentNumber = '';
  authority = '';

  gender: string;
  sexAlls: string[] = ["Hombre","Mujer"];
  valor:any;
  passwordC: any;


  constructor(
    private router: Router,
    private userService: UserService,
    private loader: LoaderService,
  ) { }

  ngOnInit(): void {
    this.numberPhone();
    this.changeFormat();
    //$("#kt_datepicker_2").flatpickr();
    //this.loadLoginForm();

  }



  numberPhone(){
    const input = document.querySelector("#phone");
        this.valor=intlTelInput(input, {
            initialCountry: 'bo',
            separateDialCode: 'true',
            autoPlaceholder: 'aggressive',
            onlyCountries: ["ar", "bo", "br", "cl", "co", "ec", 'es', "mx", "py", "pe", "us", "uy"]
        });
  }

  changeFormat(){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
    console.log(this.today);
  }

  // loadLoginForm() {
  //   this.loginForm = new FormGroup({
  //       userName: new FormControl(this.user.userName, [
  //         Validators.required,
  //         Validators.minLength(4)
  //       ]),
  //       email: new FormControl(this.user.email, [
  //         Validators.required,
  //         Validators.minLength(4),
  //         Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  //       ]),
  //       firstName: new FormControl(this.user.firstName, [
  //         Validators.required,
  //         Validators.minLength(2)
  //       ]),
  //       lastName: new FormControl(this.user.lastName, [
  //         Validators.required,
  //         Validators.minLength(2)
  //       ]),
  //       phone: new FormControl(this.user.phone, [
  //         Validators.required,
  //         Validators.minLength(2)
  //       ]),
  //       documentNumber: new FormControl(this.user.documentNumber, [
  //         Validators.required,
  //         Validators.minLength(5)
  //       ]),
  //       password: new FormControl(this.user.password, [
  //         Validators.required,
  //         Validators.minLength(5)
  //       ]),
  //       passwordC: new FormControl(this.passwordC, [
  //         Validators.required,
  //         Validators.minLength(5)
  //     ]),
  //   });
  // }

  createUser(){
    this.user.userName=this.userName;
    this.user.person.firstName=this.firstName;
    this.user.person.lastName=this.lastName;
    this.user.email=this.email;
    this.user.person.sex=this.gender;
    this.user.person.phoneNumber=this.phone;
    this.user.person.birthdate=this.birthdate;
    this.user.person.documentNumber=this.documentNumber;
    //this.user.documentType="CI";
    //this.user.authority="USER";
    if(this.password===this.passwordC){
      this.user.password=this.password;
      this.userService.createNewUserByConfirm(this.user).subscribe((resp) => {
        if(resp.body!==null){
            this.loader.stopLoading();
            Swal.fire({
                title: 'Se creo la cuenta exitosamente',
                // text: 'Porfavor revise su correo electronico para la verificacion',
                text: 'Al ingresar actualice sus datos personales',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: "Cerrar",
                customClass: {
                    confirmButton: 'btn btn-success'
                }
            }).then(r => {
                this.router.navigate(['/login']).then();
            });
        }
        else{
            Swal.fire({
                title: 'Surgio un error',
                text: 'Error al crear la cuenta.',
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: "Cerrar",
                customClass: {
                    confirmButton: 'btn btn-danger'
                }
            }).then(r => {});
        }
      },
      );
    }else{
      Swal.fire({
          title: 'Error al crear cuenta',
          text: 'Datos Incorrectas',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: "Cerrar",
          customClass: {
              confirmButton: 'btn btn-danger'
          }
      }).then(r => {});
    }
    console.log(this.user.userName)
    console.log(this.userName)
    console.log(this.gender)

  }

  favFruit: string;
  fruits: string[] = ["Banana", "Apple", "Guava", "Strawberry"];

  radioFun(){
    return console.log(this.favFruit);
  }


}
