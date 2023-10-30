import { Category } from "./Category";

export class Product {
  constructor(
    public id: number,
    public descriptionProduct: string,
    public nameProduct: string,
    public price: number,
    public status: boolean,
    public stockTotal: number,
    public category: Category,
    //public category: Category[],
  ) { }
}
