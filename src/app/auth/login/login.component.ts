import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { LoginDTO } from '../../model/DTO/LoginDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: LoginDTO = new LoginDTO('', '');

    loginForm!: FormGroup;
    forgotPasswordForm!: FormGroup;
    show= true;
    codConfirm = "";
    isForgotPassword!: boolean;
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {

    }

    ngOnInit(): void {
        console.log("ENTRO")
        this.isForgotPassword = false;
        this.confirmEmail();
        this.loadLoginForm();


    }

    confirmEmail(){
        if("FAILED"===this.codConfirm){
            Swal.fire({
                title: "Su cuenta ya fue activada anteriormente.",
                text: "Ya deberia poder iniciar sesion",
                icon: "error",
                showConfirmButton: false,
                timer: 6000,
            });
        }
        else{
            if("SUCCESSFUL"===this.codConfirm){
                Swal.fire({
                    title: "Su cuenta fue activada correctamente.",
                    text: "Ya puede iniciar sesion",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 6000,
                });
            }
        }
        this.router.navigate(['/login']).then();
    }

    loadLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl(this.user.userName, [
                Validators.required,
                Validators.minLength(4),
            ]),
            password: new FormControl(this.user.password, [
               Validators.required,
               Validators.minLength(5)
            ]),
        });

        this.forgotPasswordForm = new FormGroup({
            emailForgot: new FormControl("", [
                Validators.required,
                Validators.minLength(4),
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]),
        });

        console.log(this.user.userName)
    }
    async login() {
        this.logout();
        if (!this.loginForm.valid) {
            this.loginForm.controls['email'].markAsTouched();
            this.loginForm.controls['password'].markAsTouched();


        } else {
          // console.log(this.loginForm.controls['email'].value)
          //   console.log(this.loginForm.controls['password'].value)

            // this.loader.startLoading('Procesando...');
            // this.loader.stopLoading();

            this.authService.login({
              ...this.loginForm.value
          }).subscribe(
              async (resp) => {
                  if ( resp && resp.body.id_token ) {
                      await this.authService.saveLogin(resp.body.user, resp.body.id_token);
                      this.router.navigate([resp.body.user.authority?.id === 'ADMIN' ? '/perfil' : '/perfil']).then(r => {
                          console.log('AUTORIZADO');
                      });
                  } else {
                      Swal.fire({
                          title: 'Error al Iniciar Sesión',
                          text: 'Credenciales Incorrectas',
                          icon: 'error',
                          buttonsStyling: false,
                          confirmButtonText: "Cerrar",
                          customClass: {
                              confirmButton: 'btn btn-danger'
                          }
                      }).then(r => {});
                  }
              },
              (error) => {
                  Swal.fire({
                      title: 'Error al Iniciar Sesión',
                      text: 'Credenciales Incorrectas',
                      icon: 'error',
                      buttonsStyling: false,
                      confirmButtonText: "Cerrar",
                      customClass: {
                          confirmButton: 'btn btn-danger'
                      }
                  }).then(r => {});
              });
        }
    }
    logout() {
        // this.authService.logout();
    }



    getMessageError(field: string, errors: any): string {
        // @ts-ignore
        return _errorMessage.Login[field][Object.keys(errors)[0]];
    }
    get email() { return this.loginForm.get('email')!; }
    get password() { return this.loginForm.get('password')!; }
    get emailForgot() { return this.forgotPasswordForm.get('emailForgot')!; }

    forgotPassword(){

    }

}
const _errorMessage = {
    'Login': {
        'email': {
            'required': 'Este campo es requerido.',
            'minlength': 'El campo debe tener al menos 5 caracteres.',
            'pattern': 'Valor del campo no válido.'
        },
        'emailForgot': {
            'required': 'Este campo es requerido.',
            'minlength': 'El campo debe tener al menos 5 caracteres.',
            'pattern': 'Valor del campo no válido.'
        },
        'password': {
            'required': 'Contraseña es requerido.',
            'minlength': 'La contraseña debe tener al menos 5 caracteres.'
        }
    }

}
