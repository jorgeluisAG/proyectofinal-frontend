import { AlumColors } from "../AlumColors";
import { AluminumSeries } from "../AluminumSeries";
import { Category } from "../Category";
import { ProductColorDTO } from "./ProductColorDTO";
import { ProductImagesDTO } from "./ProductImagesDTO";
import { ProductSeriesDTO } from "./ProductSeriesDTO";

export class ProductNewDTO {
  constructor(

    public id: number,
    public nameProduct: string,
    public descriptionProduct: string,
    public stockTotal: number,
    public price: number,
    public sizeProduct: string,
    public status: boolean,
    public categoryId: number,
    public alumColorStockRequests: AlumColors[],
    public aluminumSeriesRequests: AluminumSeries[],
    public productImagesRequests: ProductImagesDTO[],


  ) { }
}
