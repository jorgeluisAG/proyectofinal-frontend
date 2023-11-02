import { Category } from "../Category";
import { ProductColorDTO } from "./ProductColorDTO";
import { ProductImagesDTO } from "./ProductImagesDTO";
import { ProductSeriesDTO } from "./ProductSeriesDTO";

export class ProductDTO {
  constructor(

    public id: number,
    public nameProduct: string,
    public descriptionProduct: string,
    public stockTotal: number,
    public price: number,
    public status: boolean,
    public category: Category,
    public productColorResponses: ProductColorDTO[],
    public productSeriesResponses: ProductSeriesDTO[],
    public productImagesResponses: ProductImagesDTO[],


  ) { }
}
