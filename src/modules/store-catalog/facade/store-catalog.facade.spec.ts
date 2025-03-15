import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/store-catalog.facade.factory";
import e from "express";

describe("Store Catalog Facade Test", () => {
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

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      salesPrice: 10,
      description: "Description of product 1",
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const result = await storeCatalogFacade.find("1");

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Product 1");
    expect(result.description).toEqual("Description of product 1");
    expect(result.salesPrice).toEqual(10);
  });
});
