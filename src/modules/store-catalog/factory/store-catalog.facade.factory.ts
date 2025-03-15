import StoreCatalogFacadeInterface from "../facade/store-catalog-.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    const findProductUseCase = new FindProductUseCase(productRepository);

    const storeCatalogFacade = new StoreCatalogFacade({
      findAllProductsUseCase,
      findProductUseCase,
    });

    return storeCatalogFacade;
  }
}
