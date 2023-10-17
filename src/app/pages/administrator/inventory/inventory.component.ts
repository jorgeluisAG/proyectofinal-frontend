import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string;
  constructor(

    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    activatedRoute.params.subscribe( params => {
      this.id = params.id;
  });
  }

  ngOnInit(): void {
    console.log("ENTRE 1")
    console.log(this.id)
  }

  vamons(){
    this.router.navigate(['/inventario'])
  }

}
