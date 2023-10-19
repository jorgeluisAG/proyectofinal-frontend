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
              return '<a href="javascript:void(0);" class="btn bg-body" data-watch-id="' + row.id + '" data-bs-toggle="modal" data-bs-target="#kt_modal_update_product_1">    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></a>'+
                  '<a  href="javascript:void(0);" class="btn bg-body" data-product-id="' + row.id + '">    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg></a>';

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
