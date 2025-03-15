export interface FindProductInputDto {
  productId: string;
}

export interface FindProductOutputDto {
  id: string;
  name: string;
  salesPrice: number;
  description: string;
}