
export class ProductColorDTO {
  constructor(
    public id: number,
    public hex: string,
    public colorName: string,
    public stockColor: number,
  ) { }
}
