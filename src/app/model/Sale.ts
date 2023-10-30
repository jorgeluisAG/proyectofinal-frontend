import { Product } from "./Product";
import { User } from "./User";

export class Sale {
  constructor(
      public id: number,
      public saleDate: string = 'null',
      public tatalPrice: number,
      public status: boolean,
      public user: User,
      public product: Product,
  ) { }
}
