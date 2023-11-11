import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';
import { PersonalService } from 'src/app/services/personal.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { UserCreateNewDTO } from 'src/app/model/DTO/UserCreateNewDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Person } from 'src/app/model/Person';
import { Authority } from 'src/app/model/Authority';
import { AddressDTO } from 'src/app/model/DTO/AddressDTO';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  userAll: Array<UserCreateNewDTO> = [];

  table: any;
  projectUrl = `${environment.projectEndpoint}`;

  // personal: UserCreateNewDTO[]=[];

  person: Person = new Person(0,'','','','','','',true)
  authority: Authority = new Authority('')
  addressrequests: Array<AddressDTO> = [];

  personal: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);
  personalOne: UserCreateNewDTO = new UserCreateNewDTO(0,'','','',false,this.authority,false,'','',this.person,'',this.addressrequests);

  fechaStatus = true;
  nombreUsuarioStatus = true;
  emailStatus = true;
  docIdentidadStatus = false;
  nombreStatus = false;
  apellidoStatus = false;
  fechaNacimientoStatus = false;
  generoStatus = false;
  contactoStatus = true;
  direccionStatus = false;





  constructor(
    private personalService: PersonalService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    //this.cargarDatos();
    console.log("Cliente 1")
    this.getPersonalListAll()
    this.changePersonal()
  }

  changePersonal(){
    delay(500);
    this.getDatatablesPersonals()

  }

  getPersonalListAll(){
    console.log(("Cliente 2"))
    this.personalService.getPersonalAll()
    .subscribe((resp: HttpResponse<any>) => {
      console.log(resp.body)
      this.personalOne = resp.body;
      console.log(this.personalOne)
    });
  }


  getDatatablesPersonals(){
    delay(500);
    console.log("Cliente 3")
    let cont =1;
    let url=`${this.projectUrl}/user`;
    console.log(url)
    this.table = $("#personal_list_table").DataTable({
      //scrollY: "480px",
      searchDelay: 500,
      processing: true,
      serverPaging: true,
      pageLength: 5,
      destroy: true,
      serverFiltering: false,
      serverSorting: false,
      order: [],
      language: {
          url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      ajax: {
          url: `${url}`,
          contentType: 'application/json',
          headers: {
              'Authorization':`Bearer ${localStorage.getItem('token')}`,
              'Content-Type':'application/json',
          },
          dataSrc: '',
      },
      columns: [
        {
          className: 'text-center',
          data: 'createdAt',
          visible: this.fechaStatus
        },
        {
          className: 'text-center',
          data: 'userName',
          visible: this.nombreUsuarioStatus
        },
        {
          className: 'text-center',
          data: 'email',
          visible: this.emailStatus
        },
        {
          className: 'text-center',
          data: 'person.documentNumber',
          visible: this.docIdentidadStatus
        },
        {
          className: 'text-center',
          data: 'person.firstName',
          visible: this.nombreStatus
        },
        {
          className: 'text-center',
          data: 'person.lastName',
          visible: this.apellidoStatus
        },
        {
          className: 'text-center',
          data: 'person.birthdate',
          visible: this.fechaNacimientoStatus
        },
        {
          className: 'text-center',
          data: 'person.sex',
          visible: this.generoStatus
        },
        {
          className: 'text-center',
          data: 'person.phoneNumber',
          visible: this.contactoStatus
        },
        {
          className: 'text-center',
          data: 'addressRequests[0].description',
          visible: this.direccionStatus
        },
        {
          className: 'text-center',
          data: null
        }
      ],
      columnDefs: [
        {
          targets: 0,
          render: function (data: any) {

            let pipe = new DatePipe('en-US');
            let date = pipe.transform(new Date(data), 'yyyy-MM-dd')
            return date;
        }
        },
        {
          targets: 10,
          render: function (data: any, type: any, row: any) {
              // return '<a href="javascript:void(0);" class="btn btn-sm btn-light btn-active-light-primary" data-watch-id="' + row.id + '" data-bs-toggle="modal" data-bs-target="#kt_modal_stacked_1">Ver' +
              //     '</a>';
              return '<a href="javascript:void(0);" class="mt-1 ms-3 me-3 mb-1" data-watch-id="' + row.id + '"  >    <svg data-bs-toggle="modal" data-bs-target="#kt_modal_see_personal_1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2677c5" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></a>'+
                  '<a  href="javascript:void(0);" class="mt-1 ms-3 me-3 mb-1" data-personal-id="' + row.id + '">    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1a422c" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg></a>'+
                  '<a  href="javascript:void(0);" class="mt-1 ms-3 me-3 mb-1" data-deleted-id="' + row.id + '">    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dd404f" class="bi bi-trash-fill" viewBox="0 0 16 16">' +
                  '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></a>';
          }
      }
      ]
    });

    this.table.on('draw', function () {
    });

  const that = this;
  let handleSearchDatatable = () => {
      const filterSearch = document.querySelector('[data-kt-customer-table-filter="search"]');
      // @ts-ignore
      filterSearch.addEventListener('keyup', function (e) {
          // @ts-ignore
          that.table.search(e.target.value).draw();
      });
  }
  handleSearchDatatable();
  this.table.on('click', '[data-watch-id]', function () {
      // @ts-ignore
      that.watchPersonal($(this).data('watch-id'));
  });
  this.table.on('click', '[data-personal-id]', function () {
    // @ts-ignore
    that.dataUpdatePersonal($(this).data('personal-id'));
  });
  this.table.on('click', '[data-deleted-id]', function () {
    // @ts-ignore
    that.dataDeletedPersonal($(this).data('deleted-id'));
  });

  }


  watchPersonal(id: number) {
    console.log(id);
    this.userService.getUserDate(id)
      .subscribe((resp) => {
        this.personalOne = resp.body;
        console.log(this.personalOne);
      });
  }
  dataUpdatePersonal(id: string){
    this.router.navigate([`/personales/informacion/${id}`]);
    console.log(id)
  }

  dataDeletedPersonal(id: number){
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "¡No podrás recuperar la informacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      console.log("EntroAqui 1");
      if (result.isConfirmed) {
        console.log("EntroAqui 2");
        this.userService.deletePersonalById(id)
          .subscribe((resp) => {
            this.getDatatablesPersonals();
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'El personal ha sido eliminado.',
              'success'
            )
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El personal esta a salvo :)',
          'error'
        )
      }
    });

  }

  validFilter(){
    this.getDatatablesPersonals()
  }

  resetFilter(){
    this.fechaStatus = true;
    this.nombreUsuarioStatus = true;
    this.emailStatus = true;
    this.docIdentidadStatus = false;
    this.nombreStatus = false;
    this.apellidoStatus = false;
    this.fechaNacimientoStatus = false;
    this.generoStatus = false;
    this.contactoStatus = true;
    this.direccionStatus = false;
    this.getDatatablesPersonals()
  }

}
