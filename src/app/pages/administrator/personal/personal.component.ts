import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';
import { PersonalService } from 'src/app/services/personal.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  table: any;
  projectUrl = `${environment.projectEndpoint}`;
  personal: User[]=[];
  constructor(
    private personalService: PersonalService,
  ) { }

  ngOnInit(): void {
    //this.cargarDatos();
    console.log("Cliente 1")
    this.getPersonalListAll()
    this.changeCustomer()
  }

  changeCustomer(){
    delay(500);
    this.getDatatablesPayment()

  }

  getPersonalListAll(){
    console.log(("Cliente 2"))
    this.personalService.getPersonalAll()
    .subscribe((resp: HttpResponse<any>) => {
      console.log(resp.body)
      this.personal = resp.body;

    });
  }


  getDatatablesPayment(){
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
              // 'Authorization':`Bearer ${localStorage.getItem('token_v2')}`,
              'Content-Type':'application/json',
          },
          dataSrc: '',
      },
      columns: [
          {
              className: 'text-center',
              data: 'createdAt',
          },
          {
              className: 'text-center',
              data: 'person.firstName',
          },
          {
              className: 'text-center',
              data: 'mail',
          },
          {
              className: 'text-center',
              data: 'address.description'
          },
          {
              className: 'text-center',
              data: null
          }
      ],
      columnDefs: [
        {
          targets: 4,
          render: function (data: any, type: any, row: any) {
              return '<a href="javascript:void(0);" class="btn btn-sm btn-light btn-active-light-primary" data-watch-id="' + row.id + '" data-bs-toggle="modal" data-bs-target="#kt_modal_stacked_1">Ver' +
                  '</a>';

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
      that.watchPayment($(this).data('watch-id'));
  });
  this.table.on('click', '[data-payment-id]', '[data-payment-code]', function () {
      // @ts-ignore
      that.dataSeePayment($(this).data('payment-id'),$(this).data('payment-code'));
  });

  }
  watchPayment(id: string) {
    console.log(id);
  }



}
