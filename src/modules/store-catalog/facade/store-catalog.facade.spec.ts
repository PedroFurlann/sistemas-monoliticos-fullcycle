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

    const input = {
      productId: "1",
    }

    const result = await storeCatalogFacade.find(input);

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Product 1");
    expect(result.description).toEqual("Description of product 1");
    expect(result.salesPrice).toEqual(10);
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      salesPrice: 10,
      description: "Description of product 1",
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      salesPrice: 20,
      description: "Description of product 2",
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const result = await storeCatalogFacade.findAll();

    expect(result.products).toHaveLength(2);
    expect(result.products[0].id).toEqual("1");
    expect(result.products[0].name).toEqual("Product 1");
    expect(result.products[0].description).toEqual("Description of product 1");
    expect(result.products[0].salesPrice).toEqual(10);
    expect(result.products[1].id).toEqual("2");
    expect(result.products[1].name).toEqual("Product 2");
    expect(result.products[1].description).toEqual("Description of product 2");
    expect(result.products[1].salesPrice).toEqual(20);
  });
});
