import { Product } from "./Product";

export class ProductImages {
  constructor(
    public id: number,
    public imagesProduct: string,
    public product: Product,
  ) { }
}
