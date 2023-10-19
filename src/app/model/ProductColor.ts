import { AlumColors } from "./AlumColors";
import { Product } from "./Product";

export class ProductColor {
  constructor(
    public id: number,
    public stockColor: number,
    public alumColors: AlumColors,
    public product: Product,
  ) { }
}
