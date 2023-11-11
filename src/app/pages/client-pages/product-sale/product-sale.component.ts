import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { ProductColorDTO } from 'src/app/model/DTO/ProductColorDTO';
import { ProductDTO } from 'src/app/model/DTO/ProductDTO';
import { ProductImagesDTO } from 'src/app/model/DTO/ProductImagesDTO';
import { ProductSeriesDTO } from 'src/app/model/DTO/ProductSeriesDTO';
import { ProductService } from 'src/app/services/product.service';
import { LoaderService } from 'src/app/shared/loader';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.css']
})
export class ProductSaleComponent implements OnInit {

  id: number;

  categoryAll: Array<Category> = [];
  category: Category = new Category(0,'');
  productColorResponses: Array<ProductColorDTO> = [];
  productSeriesResponses: Array<ProductSeriesDTO> = [];
  productImagesResponses: Array<ProductImagesDTO> = [];
  productOne: ProductDTO = new ProductDTO(0,'','',0,0,'',false,this.category,this.productColorResponses,this.productSeriesResponses,this.productImagesResponses);


  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.getProductById();
    this.getCategoryAll();
  }

  pageStoreProduct(){
    this.router.navigate(['/tienda'])
  }

  returnStoreList(){
    this.router.navigate(['/tienda'])
  }

  getProductById(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductById(this.id)
        .subscribe((resp) => {
          this.productOne = resp.body;
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
}
