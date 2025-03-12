export interface AddProductInputDto {
  id?: string;
  name: string;
  purchasePrice: number;
  description: string;
  stock: number;
}

export interface AddProductOutputDto {
  id: string;
  name: string;
  purchasePrice: number;
  description: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}