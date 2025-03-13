import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "../factory/product-adm.facade.factory";

describe("Product Adm Facade Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      purchasePrice: 10,
      description: "Description of product 1",
      stock: 10
    }

    await productFacade.addProduct(input)

    const productDb = await ProductModel.findOne({
      where: { id: input.id },
    });

    expect(input.id).toEqual(productDb.id);
    expect(input.name).toEqual(productDb.name);
    expect(input.purchasePrice).toEqual(productDb.purchasePrice);
    expect(input.description).toEqual(productDb.description);
    expect(input.stock).toEqual(productDb.stock);
  });
});