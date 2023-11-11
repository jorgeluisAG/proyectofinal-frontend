import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/Product';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { Category } from 'src/app/model/Category';
import { ProductColorDTO } from 'src/app/model/DTO/ProductColorDTO';
import { AluminumSeries } from 'src/app/model/AluminumSeries';
import { ProductSeriesDTO } from 'src/app/model/DTO/ProductSeriesDTO';
import { ProductImagesDTO } from 'src/app/model/DTO/ProductImagesDTO';
import { ProductDTO } from 'src/app/model/DTO/ProductDTO';


declare var $: any;
@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit {

  id: number;
  categoryAll: Array<Category> = [];
  colorAll: Array<ProductColorDTO> = [];
  seriesAll: Array<AluminumSeries> = [];
  category: Category = new Category(0,'');
  //product: Product = new Product(0,'','',0,0,0,[]);
  //productUpdate: Product = new Product(0,'','',0,0,0,[]);
  product: Product = new Product(0,'','',0,true,0,this.category);

  //category: Category = new Category(0,'');
  productColorResponses: Array<ProductColorDTO> = [];
  productSeriesResponses: Array<ProductSeriesDTO> = [];
  productImagesResponses: Array<ProductImagesDTO> = [];
  productAll: any = new ProductDTO(0,'','',0,0,'',false,this.category,this.productColorResponses,this.productSeriesResponses,this.productImagesResponses);

  productListFilter: string = 'ALL';
  table: any;
  projectUrl = `${environment.projectEndpoint}`;
  products: Product[]=[];
  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    //private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    console.log("Paso 1 si")
    this.getProductStoreListAll();
  }

  getProductStoreListAll(){
    console.log(("Paso 2 sii"))
    this.productService.getProductStoreAll()
    .subscribe((resp: HttpResponse<any>) => {
      console.log(resp.body)
      this.productAll = resp.body;
      console.log(this.productAll)
      console.log(this.products)
    });
  }

  getProductById(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductById(this.id)
        .subscribe((resp) => {
          this.product = resp.body;
          //this.productUpdate = this.product;
          console.log(this.product)
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

  productSaleData(id: any){
    let productId = id.getAttribute('data-product-id');
    //let productId = id.dataset.productId;
    console.log(productId);

    this.router.navigate([`tienda/Product/${productId}`]);

  }


}
