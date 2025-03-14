import Id from "../../../../@shared/domain/value-object/id.value-object";
import Product from "../../product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: "product1",
  description: "description",
  salesPrice: 10,
});

const product2 = new Product({
  id: new Id("2"),
  name: "product2",
  description: "description",
  salesPrice: 20,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    find: jest.fn(),
  };
};

describe("Find All Products Usecase unit Test", () => {
  it("should find all products", async () => {
    const productRepository = MockRepository();

    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

    const input = {};

    const result = await findAllProductsUseCase.execute(input);

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].description).toBe(product1.description);
    expect(result.products[0].salesPrice).toBe(product1.salesPrice);
    expect(result.products[1].id).toBe(product2.id.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].description).toBe(product2.description);
    expect(result.products[1].salesPrice).toBe(product2.salesPrice)
  });
});
