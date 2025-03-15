import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog-.facade.interface";

export interface UseCasesProps {
  findAllProductsUseCase: FindAllProductsUseCase;
  findProductUseCase: FindProductUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllProductsUseCase: FindAllProductsUseCase;
  private _findProductUseCase: FindProductUseCase;

  constructor(props: UseCasesProps) {
    this._findAllProductsUseCase = props.findAllProductsUseCase;
    this._findProductUseCase = props.findProductUseCase;
  }

  async find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findProductUseCase.execute(input);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllProductsUseCase.execute({});
  }
}
