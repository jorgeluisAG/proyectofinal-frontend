import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { AlumColors } from 'src/app/model/AlumColors';
import { AluminumSeries } from 'src/app/model/AluminumSeries';
import { Category } from 'src/app/model/Category';
import { ProductColorDTO } from 'src/app/model/DTO/ProductColorDTO';
import { ProductDTO } from 'src/app/model/DTO/ProductDTO';
import { ProductImagesDTO } from 'src/app/model/DTO/ProductImagesDTO';
import { ProductNewDTO } from 'src/app/model/DTO/ProductNewDTO';
import { ProductSeriesDTO } from 'src/app/model/DTO/ProductSeriesDTO';
import { ProductService } from 'src/app/services/product.service';
import { LoaderService } from 'src/app/shared/loader';
import Swal from 'sweetalert2';

declare var $: any;
declare var intlTelInput: any;
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  opcionesSelect = 'Selec';
  nameProduct = '';
  stockTotal = '';
  price = '';
  brandProduct = '';
  stockColor = '';
  //stockColor: Array<string> = [];
  numberSizeProduct = ['1','2','3','4','5','6','7','8','9','10'];
  sizeProduct = "6";
  sizeTextProduct = '';
  description = '';
  selectedColorsId = "0";
  stockColorData = "";
  selectColorNameId = "0";

  alumColorAll: Array<AlumColors> = [];
  alumColorAllSave:any[] = [];
  colorAll: Array<ProductColorDTO> = [];
  seriesAll: Array<AluminumSeries> = [];
  seriesAllSave: any[] = [];

  category: Category = new Category(0,'');
  alumColorStockRequests: Array<ProductColorDTO> = [];
  aluminumSeriesRequests: Array<ProductSeriesDTO> = [];
  productImagesRequests: Array<ProductImagesDTO> = [];

  productOne: ProductNewDTO = new ProductNewDTO(0,'','',0,0,'',false,0,this.alumColorStockRequests,this.aluminumSeriesRequests,this.productImagesRequests);

  constructor(
    private router: Router,
    private productService: ProductService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getColorAll();
    this.getSeriesAll();
  }

  createPerfilProduct(){
    this.router.navigate(['/nuevo-usuario']);
  }

  getColorAll(){
    this.loader.startLoading('Cargando...');
    this.productService.getColorAll()
        .subscribe((resp) => {

          this.alumColorAll = resp.body;
          this.alumColorAll.forEach(x=>{x.stockColor=null})
          //this.productUpdate = this.product;
          console.log(this.alumColorAll)
          //this.alumColorAll.
    })
  }

  getSeriesAll(){
    this.loader.startLoading('Cargando...');
    this.productService.getSeriesAll()
        .subscribe((resp) => {
          this.seriesAll = resp.body;

          this.seriesAll.forEach(x=>{x.check=false})
          //this.productUpdate = this.product;
          console.log(this.seriesAll)

    })
  }

  createOneProductNewPerfil(){
    this.alumColorAllSave= [];
    this.seriesAllSave= [];

    console.log(this.alumColorAll);

    this.alumColorAll.forEach(x=>{
      if(x.stockColor!=null){
        this.alumColorAllSave.push({
          id: x.id,
          colorName: x.colorName,
          hex: x.hex,
          stockColor: x.stockColor
        })
      }
    })

    this.seriesAll.forEach(x=>{
      if(x.check==true){
        this.seriesAllSave.push({
          id: x.id,
          seriesProduct: x.seriesProduct
        })
      }
    })

    console.log(this.opcionesSelect);
    console.log(this.alumColorAllSave);
    console.log(this.seriesAllSave);
    try{
      if(this.nameProduct?.length===0 || this.nameProduct===null){
        throw "Nombre del producto no ingresado";
      }
      if(this.price?.length===0 || this.price===null){
        throw "Precio Unitario del producto no ingresado";
      }
      if(this.sizeProduct?.length===0 || this.sizeProduct===null){
        throw "Tamaño del producto no ingresado";
      }
      if(this.alumColorAllSave.length==0){
        throw "No ingresaste ninguna cantidad del producto";
      }
      if(this.seriesAllSave.length==0){
        throw "No ingresaste ninguna serie del producto";
      }

      this.productOne.nameProduct=this.nameProduct;
      this.productOne.descriptionProduct=this.description;
      this.productOne.price=parseFloat(this.price);
      this.productOne.sizeProduct=this.sizeProduct+" metros";
      this.productOne.status=true;
      this.productOne.categoryId=1;
      this.productOne.alumColorStockRequests=this.alumColorAllSave;
      this.productOne.aluminumSeriesRequests=this.seriesAllSave;

      console.log(this.productOne);
      this.savedData(this.productOne);
    }
    catch(error){

      this.saltarError(error);
    }






  //   Swal.fire({
  //     title: 'Producto Creado',
  //     text: 'Producto Agregado correctamente',
  //     icon: 'success',
  //     buttonsStyling: false,
  //     confirmButtonText: "Cerrar",
  //     customClass: {
  //         confirmButton: 'btn btn-primary'
  //     }
  // }).then(r => {
  //   this.returnInventory();
  //     //$('#kt_modal_update_profile').modal('hide');
  //     // this.getUserById();
  // });

  //   // console.log(this.stockColor);

  //   console.log(this.alumColorAll);
  //   console.log(this.sizeProduct);
  //   let json = {
  //     "cantida": `${this.sizeProduct} metros`,
  //     "colores": this.alumColorAll
  //   }

  //   console.log(json);
  }

  createOneProductNewPanel(){
    this.alumColorAllSave= [];

    console.log(this.alumColorAll);

    this.alumColorAll.forEach(x=>{
      if(x.stockColor!=null){
        this.alumColorAllSave.push({
          id: x.id,
          colorName: x.colorName,
          hex: x.hex,
          stockColor: x.stockColor
        })
      }
    })

    try{
      if(this.nameProduct?.length===0 || this.nameProduct===null){
        throw "Nombre del producto no ingresado";
      }
      if(this.price?.length===0 || this.price===null){
        throw "Precio Unitario del producto no ingresado";
      }

      if(this.alumColorAllSave.length==0){
        throw "No ingresaste ninguna cantidad del producto";
      }
      this.productOne.nameProduct=this.nameProduct;
      this.productOne.descriptionProduct=this.description;
      this.productOne.price=parseFloat(this.price);
      this.productOne.status=true;
      this.productOne.categoryId=2;
      this.productOne.alumColorStockRequests=this.alumColorAllSave;

      console.log(this.productOne);
      this.savedData(this.productOne);
    }
    catch(error){

      this.saltarError(error);
    }
  }

  createOneProductNewSilicona(){
    this.alumColorAllSave= [];

    console.log(this.alumColorAll);
    console.log(this.selectColorNameId);

    this.alumColorAll.forEach(x=>{
      if(x.id===parseInt(this.selectColorNameId)){
        this.alumColorAllSave.push({
          id: x.id,
          colorName: x.colorName,
          hex: x.hex,
          stockColor: this.stockTotal
        })
      }
    })


    console.log(this.opcionesSelect);
    console.log(this.alumColorAllSave);
    // console.log(this.seriesAllSave);
    try{
      if(this.nameProduct?.length===0 || this.nameProduct===null){
        throw "Nombre del producto no ingresado";
      }
      if(this.selectColorNameId?.length===0 || this.selectColorNameId==="0"){
        throw "Color del producto no ingresado";
      }
      if(this.price?.length===0 || this.price===null){
        throw "Precio Unitario del producto no ingresado";
      }
      if(this.alumColorAllSave.length==0){
        throw "No ingresaste ninguna cantidad del producto";
      }
      this.productOne.nameProduct=this.nameProduct;
      this.productOne.descriptionProduct=this.description;
      this.productOne.price=parseFloat(this.price);
      this.productOne.status=true;
      this.productOne.categoryId=3;
      this.productOne.alumColorStockRequests=this.alumColorAllSave;

      console.log(this.productOne);
      this.savedData(this.productOne);
    }
    catch(error){

      this.saltarError(error);
    }

  }

  createOneProductNewAccesorio(){
    // this.alumColorAllSave= [];
    // this.seriesAllSave= [];

    console.log(this.alumColorAll);

    // this.alumColorAll.forEach(x=>{
    //   if(x.stockColor!=null){
    //     this.alumColorAllSave.push({
    //       id: x.id,
    //       colorName: x.colorName,
    //       hex: x.hex,
    //       stockColor: x.stockColor
    //     })
    //   }
    // })

    // this.seriesAll.forEach(x=>{
    //   if(x.check==true){
    //     this.seriesAllSave.push({
    //       id: x.id,
    //       seriesProduct: x.seriesProduct
    //     })
    //   }
    // })

    console.log(this.opcionesSelect);
    console.log(this.alumColorAllSave);
    console.log(this.seriesAllSave);
    try{
      if(this.nameProduct?.length===0 || this.nameProduct===null){
        throw "Nombre del producto no ingresado";
      }
      if(this.price?.length===0 || this.price===null){
        throw "Precio Unitario del producto no ingresado";
      }
      if(this.sizeProduct?.length===0 || this.sizeProduct===null){
        throw "Tamaño del producto no ingresado";
      }
      if(this.stockTotal?.length===0 || this.stockTotal===null){
        throw "No ingresaste ninguna cantidad del producto";
      }
      // if(this.alumColorAllSave.length==0){
      //   throw "No ingresaste ninguna cantidad del producto";
      // }
      // if(this.seriesAllSave.length==0){
      //   throw "No ingresaste ninguna serie del producto";
      // }

      this.productOne.nameProduct=this.nameProduct;
      this.productOne.descriptionProduct=this.description;
      this.productOne.price=parseFloat(this.price);
      // this.productOne.sizeProduct=this.sizeProduct+" metros";
      this.productOne.stockTotal=parseInt(this.stockTotal);
      this.productOne.status=true;
      this.productOne.categoryId=4;
      // this.productOne.alumColorStockRequests=this.alumColorAllSave;
      // this.productOne.aluminumSeriesRequests=this.seriesAllSave;

      console.log(this.productOne);
      this.savedData(this.productOne);
    }
    catch(error){

      this.saltarError(error);
    }

  }



  saltarError(error:any){
    console.log(error)
        Swal.fire({
      title: 'Error',
      text: error,
      icon: 'warning',
      buttonsStyling: false,
      confirmButtonText: "Cerrar",
      customClass: {
          confirmButton: 'btn btn-primary'
      }
    });
  }

  savedData(productNewDTO: ProductNewDTO){
    console.log(productNewDTO);
    console.log("SE GUARDO");

    this.productService.createProductNew(productNewDTO)
      .subscribe((resp) => {
        Swal.fire({
          title: 'Se creo el producto exitosamente',
          text: 'Datos guardados exitosamente',
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: "Cerrar",
          customClass: {
              confirmButton: 'btn btn-success'
          }
      }).then(r => {
        this.router.navigate(['/inventario'])
      });
    }, error => {
      Swal.fire({
        title: 'Error al Crear el Producto',
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

  createColorProductOne(){

  }

  returnInventory(){
    this.router.navigate(['/inventario'])
  }
}
