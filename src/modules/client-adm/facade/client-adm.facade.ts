import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCasesProps {
  addClientUseCase: UseCaseInterface;
  findClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addClientUseCase: UseCaseInterface;
  private _findClientUseCase: UseCaseInterface;

  constructor(props: UseCasesProps) {
    this._addClientUseCase = props.addClientUseCase;
    this._findClientUseCase = props.findClientUseCase;
  }

  add(input: AddClientFacadeInputDto): Promise<void> {
    // caso o DTO do caso de uso != do DTO da facade, é necessário fazer a conversão do DTO da facade para o DTO do caso de uso
    return this._addClientUseCase.execute(input);
  }
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return this._findClientUseCase.execute(input);
  }
}
