import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../../../services/product.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Category } from 'src/app/model/Category';
import { ProductColorDTO } from 'src/app/model/DTO/ProductColorDTO';
import { AluminumSeries } from 'src/app/model/AluminumSeries';
import { ProductDTO } from 'src/app/model/DTO/ProductDTO';
import { ProductSeriesDTO } from 'src/app/model/DTO/ProductSeriesDTO';
import { ProductImagesDTO } from 'src/app/model/DTO/ProductImagesDTO';
import { AlumColors } from 'src/app/model/AlumColors';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { ProductImages } from 'src/app/model/ProductImages';
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
  selectedColorsId = "0";
  stockColorData = "";
  productImageCargarOne = "";

  @ViewChild('myInputProduct') myInputVariable: ElementRef;

  alumColorAll: Array<AlumColors> = [];
  //categoryAll: Category[] = [];
  categoryAll: Array<Category> = [];
  colorAll: Array<ProductColorDTO> = [];
  seriesAll: Array<AluminumSeries> = [];
  category: Category = new Category(0,'');
  product: Product = new Product(0,'','',0,true,0,this.category);

  productColorOne: ProductColorDTO = new ProductColorDTO(0,'','',0);
  productImageUpdate: ProductImages = new ProductImages(0,'',this.product);
  // category: Category = new Category(0,'');
  productColorResponses: Array<ProductColorDTO> = [];
  productSeriesResponses: Array<ProductSeriesDTO> = [];
  productImagesResponses: Array<ProductImagesDTO> = [];
  productOne: ProductDTO = new ProductDTO(0,'','',0,0,'',false,this.category,this.productColorResponses,this.productSeriesResponses,this.productImagesResponses);

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
    this.getColorAll();
    this.getProductById();
    this.getCategoryAll();
    this.getProductIdColorAll();
    this.getSeriesAll();
    //console.log(this.categoryData);
    //console.log(this.selectedColorsId);
  }

  returnInventory(){
    this.router.navigate(['/inventario'])
  }
  vamons(){
    Swal.fire({
      title: 'Datos actualizados exitosamente',
      text: 'Se actualizo los datos del producto exitosament',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: "Cerrar",
      customClass: {
          confirmButton: 'btn btn-success'
      }
    }).then(r => {
      this.router.navigate(['/inventario'])
    });
    // this.router.navigate(['/inventario'])
  }

  getProductById(){
    this.loader.startLoading('Cargando...');
    this.productService.getProductById(this.id)
        .subscribe((resp) => {
          this.productOne = resp.body;
          this.product = resp.body;
          //this.productUpdate = this.product;
          console.log(this.product)
          console.log(this.productOne)
          //console.log("dd")
          //console.log(this.productOne.productImagesResponses[0].imageProduct)
          // this.productImageCargarOne = this.productOne.productImagesResponses[0].imageProduct;
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
  getProductIdColorAll(){
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

  getColorAll(){
    this.loader.startLoading('Cargando...');
    this.productService.getColorAll()
        .subscribe((resp) => {
          this.alumColorAll = resp.body;
          //this.productUpdate = this.product;
          console.log(this.alumColorAll)

    })
  }

  updateOneProductColorById(){
    this.productColorOne.id=this.id;
    this.productColorOne.colorName=this.selectedColorsId;
    this.productColorOne.stockColor= parseInt(this.stockColorData);

    // console.log(this.selectedColorsId);
    // console.log(this.stockColorData);
    // console.log(this.id);
    this.productService.updateProductColorOneById(this.productColorOne)
    .subscribe((resp: HttpResponse<any>) => {
      Swal.fire({
          title: 'Agregar el Color y la Cantidad',
          text: 'Color Agregado correctamente',
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: "Cerrar",
          customClass: {
              confirmButton: 'btn btn-primary'
          }
      }).then(r => {
        this.selectedColorsId = "0";
        this.stockColorData = "";
        this.ngOnInit();
          //$('#kt_modal_update_profile').modal('hide');
          // this.getUserById();
      });
    }, error => {
        Swal.fire({
          title: 'Error al Agregar un Color y la Cantidad',
          text: 'Intente nuevamente',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: "Cerrar",
          customClass: {
              confirmButton: 'btn btn-danger'
          }
      }).then(r => {});
    });
  }

  cargarProductImagen(event: any){
    console.log("CARGA IMAGE")
    let file = event.target.files[0];
    let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      this.productImageCargarOne=reader.result+"";
      console.log(reader.result);
    };
  }

  eliminarProductImagen(){

    this.productImageCargarOne="";
    this.reset();
  }

  reset() {
    console.log(this.myInputVariable.nativeElement.value)
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.value)
  }

  guardarProductImagen(){
    let valorProduct = {
      id: this.productOne.id,
      imageProduct: this.productImageCargarOne.split(",").pop(),
      product: null
    };
    console.log(valorProduct)
    this.productService.updateProductImagen(valorProduct)
            .subscribe((resp: HttpResponse<any>) => {
                this.product = resp.body;
                this.eliminarProductImagen();
                console.log(this.product)
                Swal.fire({
                  title: 'Imagen Actulizado',
                  text: 'Se cambio la imagen exitosamente',
                  icon: 'success',
                  buttonsStyling: false,
                  confirmButtonText: "Cerrar",
                  customClass: {
                      confirmButton: 'btn btn-success'
                  }
              })
              this.ngOnInit();
        });
  }

  updateProductOne(){
    Swal.fire({
      title: 'Datos actualizados exitosamente',
      text: 'Se actualizo los datos del producto exitosament',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: "Cerrar",
      customClass: {
          confirmButton: 'btn btn-success'
      }
  }).then(r => {
    this.router.navigate(['/inventario'])
  });
  }

}
