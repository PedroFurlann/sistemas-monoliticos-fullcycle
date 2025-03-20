import Id from "../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../store-catalog/facade/store-catalog-.facade.interface";
import Product from "../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;
  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ clientId: input.clientId });

    if (!client) {
      throw new Error("Client not found");
    }

    await this.validateProducts(input);
    // recuperar os produtos

    // criar o objeto do client
    // criar o objeto da order(client, products)

    // processpayment => facade.processPayment(orderId, amount)

    // caso o pagamento seja aprovado => Gerar invoice
    // mudar o status da order para approved
    // retornar o DTO
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products selected");
    }

    for (const product of input.products) {
      const productAvailable = await this._productFacade.checkStock({
        productId: product.productId,
      });

      if (productAvailable.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        );
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };

    return new Product(productProps);
  }
}
