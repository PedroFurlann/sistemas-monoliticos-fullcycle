import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
  addProductUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(props: UseCasesProps) {
    this._addProductUseCase = props.addProductUseCase;
    this._checkStockUseCase = props.checkStockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o DTO do caso de uso != do DTO da facade, é necessário fazer a conversão do DTO da facade para o DTO do caso de uso
    return this._addProductUseCase.execute(input);
  }
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input);
  }
}
