import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../services/product.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Category } from 'src/app/model/Category';
import { ProductColorDTO } from 'src/app/model/DTO/ProductColorDTO';
import { AluminumSeries } from 'src/app/model/AluminumSeries';
import { ProductDTO } from 'src/app/model/DTO/ProductDTO';
import { ProductSeriesDTO } from 'src/app/model/DTO/ProductSeriesDTO';
import { ProductImagesDTO } from 'src/app/model/DTO/ProductImagesDTO';
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
  id: number;

  //categoryAll: Category[] = [];
  categoryAll: Array<Category> = [];
  colorAll: Array<ProductColorDTO> = [];
  seriesAll: Array<AluminumSeries> = [];
  category: Category = new Category(0,'');
  product: Product = new Product(0,'','',0,true,0,this.category);

  // category: Category = new Category(0,'');
  productColorResponses: Array<ProductColorDTO> = [];
  productSeriesResponses: Array<ProductSeriesDTO> = [];
  productImagesResponses: Array<ProductImagesDTO> = [];
  productOne: ProductDTO = new ProductDTO(0,'','',0,0,false,this.category,this.productColorResponses,this.productSeriesResponses,this.productImagesResponses);

  productColor = [
    {
      id: 1,
      colorName: 'negro',
      colorHex: '#000000'
    },
    {
      id: 2,
      colorName: 'azul',
      colorHex: 'blue'
    },
    {
      id: 2,
      colorName: 'blanco',
      colorHex: 'red'
    }
  ]

  //categoryData = Object.values();


  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    //private categoryService: CategoryService,
    private router: Router
  ) {
    activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    console.log("DALE 1")
    console.log(this.id)
    this.getProductById();
    this.getCategoryAll();
    this.getColorAll();
    this.getSeriesAll();
    //console.log(this.categoryData);
  }

  vamons(){
    this.router.navigate(['/inventario'])
  }

  getProductById(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductById(this.id)
        .subscribe((resp) => {
          this.productOne = resp.body;
          //this.productUpdate = this.product;
          console.log(this.productOne)
    })
  }

  getCategoryAll(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductCategoryAll(this.id)
        .subscribe((resp) => {
          this.categoryAll = resp.body;
          //this.productUpdate = this.product;
          console.log(this.categoryAll)

    })
  }
  getColorAll(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductColorAll(this.id)
        .subscribe((resp) => {
          this.colorAll = resp.body;
          //this.productUpdate = this.product;
          console.log(this.colorAll)

    })
  }

  getSeriesAll(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductSeriesAll(this.id)
        .subscribe((resp) => {
          this.seriesAll = resp.body;
          //this.productUpdate = this.product;
          console.log(this.seriesAll)

    })
  }

}
