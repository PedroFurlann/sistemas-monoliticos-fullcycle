import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  salesPrice: 10,
  description: "Product 1 description",
})

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(product)
  }
}

describe("Find Product Usecase Unit Test", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)
    const input = {
      productId: "1"
    }

    const result = await findProductUseCase.execute(input)

    expect(productRepository.find).toHaveBeenCalled()
    expect(result.id).toBe(product.id.id)
    expect(result.name).toBe(product.name)
    expect(result.salesPrice).toBe(product.salesPrice)
    expect(result.description).toBe(product.description)
  })
});