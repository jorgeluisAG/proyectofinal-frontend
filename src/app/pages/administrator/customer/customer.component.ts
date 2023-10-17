import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';
import { CustomerService } from 'src/app/services/customer.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  cambioTabla=true;
  customerListFilter: string = 'ALL';
  table: any;
  projectUrl = `${environment.projectEndpoint}`;
  customer: User[]=[];

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    //this.cargarDatos();
    console.log("Cliente 1")
    this.getCustomerListAll()
    this.changeCustomer()
  }

  changeCustomer(){
    delay(500);
    this.getDatatablesPayment()

  }

  getCustomerListAll(){
    console.log(("Cliente 2"))
    this.customerService.getCustomerAll()
    .subscribe((resp: HttpResponse<any>) => {
      console.log(resp.body)
      this.customer = resp.body;

    });
  }


  getDatatablesPayment(){
    delay(500);
    console.log("Cliente 3")
    let cont =1;
    let url=`${this.projectUrl}/user`;
    console.log(url)
    this.table = $("#customer_list_table").DataTable({
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
              data: 'person.phoneNumber',
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
          targets: 0,
          render: function (data: any) {
            let date = new Date(data)
            return date.toLocaleString();
        }
        },
        {
          targets: 4,
          render: function (data: any, type: any, row: any) {
              return '<a href="javascript:void(0);" class="btn btn-sm btn-light btn-active-light-primary" data-watch-id="' + row.id + '" data-bs-toggle="modal" data-bs-target="#kt_modal_view">Ver' +
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




  cargarDatos(){
    let status = {
      1: {"title": "Pending", "state": "primary"},
      2: {"title": "Delivered", "state": "danger"},
      3: {"title": "Canceled", "state": "primary"},
      4: {"title": "Success", "state": "success"},
      5: {"title": "Info", "state": "info"},
      6: {"title": "Danger", "state": "danger"},
      7: {"title": "Warning", "state": "warning"},
    };

    $("#kt_datatable_fixed_header").DataTable({
      "fixedHeader": {
        "header":true,
        "headerOffset": 5
      },
      "columnDefs": [
        {
          // The `data` parameter refers to the data for the cell (defined by the
          // `data` option, which defaults to the column being worked with, in
          // this case `data: 0`.
          "render": function ( data: any, type: any, row: any ) {
            var index = 3;

            return data + '<span class="ms-2 badge badge-light-' + status[index]['state'] + ' fw-bold">' + status[index]['title'] + '</span>';
          },
          "targets": 1
        }
      ]
    });
  }
}
