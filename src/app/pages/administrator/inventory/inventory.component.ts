import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  cambioTabla=true;
  inventoryFilter: string = 'ALL';
  valorE = 'Algo';
  table: any;
  projectUrl = `${environment.projectEndpoint}`;
  product: Product[]=[];

  productColor = [
    {
      id: 1,
      colorName: 'negro',
      colorHex: '#000000'
    },
    {
      id: 2,
      colorName: 'blanco',
      colorHex: '#FFFFFF'
    },
    {
      id: 2,
      colorName: 'blanco',
      colorHex: 'red'
    }
  ]

  constructor(

    private productService: ProductService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    console.log("ENTRE 11111")
    this.getInventoryListAll()
    this.changeInventoryList();
  }

  changeInventoryList(){
    delay(500);
    this.getDatatablesPayment()

  }
  getInventoryListAll(){
    console.log(("ENTRE 22222"))
    this.productService.getProductAll()
    .subscribe((resp: HttpResponse<any>) => {
      console.log(resp.body)
      this.product = resp.body;

    });
  }

  getlistInventoryListAll(){
    console.log(("ENTRE 223434222"))
    this.productService.getListProductRegister("0ef291bf-0070-4444-b949-b4144bba6559")
    .subscribe((resp: HttpResponse<any>) => {
      console.log(resp.body)
      this.product = resp.body;

    });
  }

  getDatatablesPayment(){
    delay(500);
    console.log("ENTRE 333333")
    let cont =1;
    let url=`${this.projectUrl}/product`;
    console.log(url)
    this.table = $("#inventory_list_admin").DataTable({
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
              data: 'id',
          },
          {
              className: 'text-center',
              data: 'category.nameCategory',
          },
          {
              className: 'text-center',
              data: 'nameProduct',
          },
          {
              className: 'text-center',
              data: 'descriptionProduct'
          },
          {
              className: 'text-center',
              data: 'stockTotal'
          },
          {
              className: 'text-center',
              data: 'price'
          },
          {
              className: 'text-center',
              data: null
          }
      ],
      columnDefs: [
        {
          targets: 6,
          render: function (data: any, type: any, row: any) {
              return '<a href="javascript:void(0);" class="btn btn-sm btn-light btn-active-light-primary" data-watch-id="' + row.id + '" data-bs-toggle="modal" data-bs-target="#kt_modal_update_product_1">Ver' +
                  '</a>'+
                  '<a  href="javascript:void(0);" class="btn btn-sm btn-light btn-active-light-primary" data-product-id="' + row.id + '">edit</a>';

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
  this.table.on('click', '[data-product-id]', function () {
      // @ts-ignore
      that.dataSeePayment($(this).data('product-id'));
  });

  }
  watchPayment(id: string) {
    console.log(id);
}
dataSeePayment(id: string){
  this.router.navigate([`/inventario/producto/${id}`]);
  console.log(id)
}

}
