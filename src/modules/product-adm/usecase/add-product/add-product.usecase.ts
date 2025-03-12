import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {
  private  productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this.productRepository = productRepository;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      purchasePrice: input.purchasePrice,
      description: input.description,
      stock: input.stock
    }

    const product = new Product(props)

    this.productRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      purchasePrice: product.purchasePrice,
      description: product.description,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}