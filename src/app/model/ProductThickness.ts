import { Product } from "./Product";
import { Thickness } from "./Thickness";

export class ProductAlumSeries {
  constructor(
    public id: number,
    public product: Product,
    public thickness: Thickness,
  ) { }
}
