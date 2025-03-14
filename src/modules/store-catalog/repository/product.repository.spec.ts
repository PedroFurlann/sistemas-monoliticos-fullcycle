import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";

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

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      salesPrice: 10,
      description: "Description of product 1",
    })

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      salesPrice: 20,
      description: "Description of product 2",
    })

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();
    
    expect(products).toHaveLength(2);
    expect(products[0].id.id).toEqual("1");
    expect(products[0].name).toEqual("Product 1");
    expect(products[0].salesPrice).toEqual(10);
    expect(products[0].description).toEqual("Description of product 1");
    expect(products[1].id.id).toEqual("2");
    expect(products[1].name).toEqual("Product 2");
    expect(products[1].salesPrice).toEqual(20);
    expect(products[1].description).toEqual("Description of product 2");
  });
});
