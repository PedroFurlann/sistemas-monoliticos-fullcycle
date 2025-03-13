import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("Product Repository Test", () => {
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
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      purchasePrice: 10,
      description: "Description of product 1",
      stock: 10,
    };

    const product = new Product(productProps);

    const productRepository = new ProductRepository();

    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: product.id.id },
    });

    expect(productProps.id.id).toEqual(productDb.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
    expect(productProps.description).toEqual(productDb.description);
    expect(productProps.stock).toEqual(productDb.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    ProductModel.create({
      id: "1",
      name: "Product 1",
      purchasePrice: 10,
      description: "Description of product 1",
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const productDb = await productRepository.find("1");

    expect(productDb.id.id).toEqual("1");
    expect(productDb.name).toEqual("Product 1");
    expect(productDb.purchasePrice).toEqual(10);
    expect(productDb.description).toEqual("Description of product 1");
    expect(productDb.stock).toEqual(10);
  });
});
