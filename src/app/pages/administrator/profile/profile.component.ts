import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { delay} from "rxjs/operators";
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { Person } from '../../../model/Person';
import { Address } from '../../../model/Address';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import Swal from 'sweetalert2';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import { ResetPasswordDTO } from 'src/app/model/DTO/ResetPasswordDTO';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {





    person: Person = new Person(0,'','','','','','',true)
    authority: Authority = new Authority('')
    userAll: User = new User(0,'','','',false,'','','',this.person,'');
    //userUpdated: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);
    // userUpdated: User[] = [];
    addressrequests: Array<AddressDTO> = [];
    // user: Array<any> = [];

    user: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);
    // user: any;
    userUpdate: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);

    gender: string;
    sexAlls: string[] = ["hombre","mujer"];
    userCargaImagen = '';
    birthdateUser = '';
    direccionPut= '';
    resetPasswordDTO: ResetPasswordDTO = new ResetPasswordDTO(0,'','','');

    @ViewChild('myInput') myInputVariable: ElementRef;



    valorselect = 'CLIENTE';

    constructor(
      private authService: AuthService,
      private userService: UserService,

    ) { }

    ngOnInit(): void {
        this.getUserById();
    }




    getUserById(){
        //this.userService.getUserDate("13d96253-3048-4e93-ba50-28512be4fcfd")
        // @ts-ignore
        let idUserAuthorized = JSON.parse(localStorage?.getItem('dataUser')).id;
        console.log(idUserAuthorized);
        this.userService.getUserDate(idUserAuthorized)
            .subscribe((resp: HttpResponse<any>) => {
                this.user = resp.body;
                this.userUpdate = this.user;
                console.log(this.user)

                let date = new Date(this.user.person.birthdate).toLocaleDateString('en-ES');
                //console.log(this.user.addressrequests[0].description)
                // this.birthdateUser = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
                this.birthdateUser = date;

        });

    }


    getFullName() {
        let val = this.user.person.firstName + ' ' + this.user.person.lastName;
        return val;
    }

    closeResetPasword(){
      this.resetPasswordDTO.password="";
      this.resetPasswordDTO.newPassword="";
      this.resetPasswordDTO.confirmPassword="";
    }

    changePassword(){
      this.resetPasswordDTO.id = this.user.id;
      if(this.resetPasswordDTO.newPassword===this.resetPasswordDTO.confirmPassword){
        this.authService.changePassword(this.resetPasswordDTO)
          .subscribe((resp: HttpResponse<any>) => {
            if(resp.body!=null){
              Swal.fire({
                  title: 'Constraseña cambiada correctamente',
                  // text: 'Vuelva iniciar sesion para entrar al sistema',
                  text: 'Su contraseña fue actualizada',
                  icon: 'success',
                  buttonsStyling: false,
                  confirmButtonText: "Cerrar",
                  customClass: {
                      confirmButton: 'btn btn-primary'
                  }
              }).then(r => {
                this.getUserById();
                this.closeResetPasword();
                // $('#kt_update_true_password').modal('hide');
              });
                  //this.authService.logout();
            }else{
              Swal.fire({
                  title: 'Error al actualizar la contraseña',
                  text: 'Intente nuevamente',
                  icon: 'error',
                  buttonsStyling: false,
                  confirmButtonText: "Cerrar",
                  customClass: {
                      confirmButton: 'btn btn-danger'
                  }
              }).then(r => {
                this.closeResetPasword();
              });
            }
          }, error => {
            Swal.fire({
              title: 'Error al actualizar la contraseña',
              text: 'Intente nuevamente',
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: "Cerrar",
              customClass: {
                  confirmButton: 'btn btn-danger'
              }
            }).then(r => {
              this.closeResetPasword();
            });
          });
        }
        else{
          Swal.fire({
              title: 'Error al actualizar la contraseña',
              text: 'La nueva contraseña no coinciden con la otra',
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: "Cerrar",
              customClass: {
                  confirmButton: 'btn btn-danger'
              }
          }).then(r => {
            this.closeResetPasword();
          });
        }

        // $("#exampleModal").find("input,textarea,select").val("");
    }

    updateUser(){
      if (this.direccionPut!=''){
        let address: AddressDTO={
            id: 0, // bno cuenta
            description: this.direccionPut,
            status: true,
        }
      this.user.addressRequests.push(address);
      }
      this.userService.updateUser(this.userUpdate)
      .subscribe((resp: HttpResponse<any>) => {
        Swal.fire({
            title: 'Gestión de Usuarios',
            text: 'Usuario Actualizado correctamente',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: "Cerrar",
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        }).then(r => {
            //$('#kt_modal_update_profile').modal('hide');
            this.getUserById();
        });
      }, error => {
          Swal.fire({
            title: 'Error al Actualizar Usuario',
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

    cargaImagen(event: any) {
      console.log("CARGA IMAGE")
      let file = event.target.files[0];
      let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.userCargaImagen=reader.result+"";
        console.log(reader.result);
    };
    }
    eliminarImage(){

      this.userCargaImagen="";
      this.reset();
    }

    reset() {
      console.log(this.myInputVariable.nativeElement.value)
      this.myInputVariable.nativeElement.value = "";
      console.log(this.myInputVariable.nativeElement.value)
  }

  guardarImagen(){
    let valores = {
      id: this.user.id,
      imageUser: this.userCargaImagen.split(",").pop(),
    };
    console.log(valores)
    this.userService.putImagenUser(valores)
            .subscribe((resp: HttpResponse<any>) => {
                this.user = resp.body;
                this.eliminarImage();
                console.log(this.user)
                Swal.fire({
                  title: 'Imagen Actulizada',
                  text: 'Se guardo la imagen exitosamente',
                  icon: 'success',
                  buttonsStyling: false,
                  confirmButtonText: "Cerrar",
                  customClass: {
                      confirmButton: 'btn btn-success'
                  }
              }).then(r => {
                this.ngOnInit();
              });
        });
  }
}
