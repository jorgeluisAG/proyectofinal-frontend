import { AluminumSeries } from "./AluminumSeries";
import { Product } from "./Product";

export class ProductAlumSeries {
  constructor(
    public id: number,
    public aluminumSeries: AluminumSeries,
    public product: Product,
  ) { }
}
