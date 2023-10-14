import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryFilter: string = 'ALL';

  table: any;
  proyectUrl = `${environment.projectEndpoint}`;
  product: Product[]=[];

  constructor(
    //private productService: ProductService,
  ) { }

  ngOnInit(): void {
    console.log("ENTRE 1")

  }



}
