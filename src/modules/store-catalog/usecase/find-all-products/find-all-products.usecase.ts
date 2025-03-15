import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import Product from "../../domain/product.entity";
import {
  FindAllProductsInputDto,
  FindAllProductsOutputDto,
} from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
  constructor(private productRepository: ProductGateway) {}

  async execute(
    input: FindAllProductsInputDto
  ): Promise<FindAllProductsOutputDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product: Product) => ({
        id: product.id.id,
        name: product.name,
        salesPrice: product.salesPrice,
        description: product.description,
      })),
    };
  }
}
