import { Category } from "./Category";
import { ProductColor } from "./ProductColor";

export class Product {
  constructor(
    public id: number,
    public codeProduct: string,
    public nameProduct: string,
    public price: number,
    public stock: number,
    public descriptionProduct: string,
    public imageProduct: string,
    public state: number,
    public productColor: ProductColor,
    public category: Category,
  ) { }
}
