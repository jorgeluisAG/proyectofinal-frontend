import { Category } from "./Category";

export class Product {
  constructor(
    public id: number,
    public descriptionProduct: string,
    public nameProduct: string,
    public price: number,
    public state: number,
    public stockTotal: number,
    public category: Category,
  ) { }
}
