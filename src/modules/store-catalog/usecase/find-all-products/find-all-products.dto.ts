export interface FindAllProductsInputDto {}

export interface FindAllProductsOutputDto {
  products: {
    id: string;
    name: string;
    salesPrice: number;
    description: string;
  }[];
}
