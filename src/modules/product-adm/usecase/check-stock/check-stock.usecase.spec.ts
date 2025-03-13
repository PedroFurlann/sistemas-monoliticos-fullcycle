import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 10,
  stock: 10,
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(product)
  }
}

describe("Check Stock usecase unit test", () => {
  it("should check product stock", async () => {
    const productRepository = MockRepository()
    const checkStockUseCase = new CheckStockUseCase(productRepository)
    const input = {
      productId: "1"
    }

    const result = await checkStockUseCase.execute(input)

    expect(productRepository.find).toHaveBeenCalled()
    expect(result.productId).toBe(product.id.id)
    expect(result.stock).toBe(product.stock)
  })
});