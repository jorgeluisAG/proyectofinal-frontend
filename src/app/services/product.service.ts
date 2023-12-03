import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ProductColorDTO } from '../model/DTO/ProductColorDTO';
import { ProductDTO } from '../model/DTO/ProductDTO';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private projectUrl = `${environment.projectEndpoint}/product`;
  private header = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(
    private http: HttpClient
  ) { }

  getListProductRegister(registerId: String): Observable<HttpResponse<any>> {
    let url = `${this.projectUrl}/list/${registerId}`;
      return this.http.get(url ,{
        observe: 'response',
        headers: this.header
      });
  };

  getProductAll(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.projectUrl}`, {headers: this.header, observe: 'response'});
  };

  getProductStoreAll(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.projectUrl}/store`, {headers: this.header, observe: 'response'});
  };

  getProductById(id: number): Observable<HttpResponse<any>>{
    return this.http.get(`${this.projectUrl}/${id}`, {headers: this.header, observe: 'response'});
  }

  getProductCategoryAll(id: number): Observable<HttpResponse<any>>{
    return this.http.get(`${this.projectUrl}/category/different/${id}`, {headers: this.header, observe: 'response'});
  }

  getProductColorAll(id: number): Observable<HttpResponse<any>>{
    return this.http.get(`${this.projectUrl}/color/${id}`, {headers: this.header, observe: 'response'});
  }

  getProductSeriesAll(id: number): Observable<HttpResponse<any>>{
    return this.http.get(`${this.projectUrl}/series/${id}`, {headers: this.header, observe: 'response'});
  }

  deletedProductById(id: number) {
    return this.http.delete(`${this.projectUrl}/deleted/${id}`, {headers: this.header, observe: 'response'});
  }

  getColorAll(): Observable<HttpResponse<any>>{
    return this.http.get(`${this.projectUrl}/colors/all`, {headers: this.header, observe: 'response'});
  }

  getSeriesAll(): Observable<HttpResponse<any>>{
    return this.http.get(`${this.projectUrl}/series/all`, {headers: this.header, observe: 'response'});
  }

  updateProductColorOneById(productColorDTO: ProductColorDTO): Observable<HttpResponse<any>> {
    return this.http.put(`${this.projectUrl}/color/add`,productColorDTO, {headers: this.header, observe: 'response'});
  }

  updateProductImagen(imageProduct: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.projectUrl}/image/update`,imageProduct, {headers: this.header, observe: 'response'});
  }

  createProductNew(productDTO: ProductDTO): Observable<HttpResponse<any>> {
    return this.http.put(`${this.projectUrl}/confirm`,productDTO, {headers: this.header, observe: 'response'});
  }


}
