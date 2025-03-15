import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";;
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

  it("should check product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    ProductModel.create({
      id: "1",
      name: "Product 1",
      purchasePrice: 10,
      description: "Description of product 1",
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const input = {
      productId: "1"
    }

    const result = await productFacade.checkStock(input)

    expect(result.productId).toEqual("1");
    expect(result.stock).toEqual(10);
  });
});