import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  constructor(
    clientFacade: ClientAdmFacadeInterface
  ) {
    this._clientFacade = clientFacade;
  }


  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ clientId: input.clientId});

    if (!client) {
      throw new Error("Client not found");
    }

    // buscar o cliente. Caso nao encontre => client not found
    // validar os produtos.
    // recuperar os produtos

    // criar o objeto do client
    // criar o objeto da order(client, products)
    

    // processpayment => facade.processPayment(orderId, amount)

    // caso o pagamento seja aprovado => Gerar invoice
    // mudar o status da order para approved
    // retornar o DTO
  }
}