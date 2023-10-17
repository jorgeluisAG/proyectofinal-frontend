import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-dates',
  templateUrl: './product-dates.component.html',
  styleUrls: ['./product-dates.component.css']
})
export class ProductDatesComponent implements OnInit {

  productDatesFilter: string = 'ALL';
  table: any;
  projectUrl = `${environment.projectEndpoint}`;
  productDates: Product[]=[];
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
    console.log("DALE 1")
    console.log(this.id)
  }

  vamons(){
    this.router.navigate(['/inventario'])
  }

}
