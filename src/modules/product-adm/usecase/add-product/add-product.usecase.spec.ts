import { AddProductInputDto } from "./add-product.dto"
import AddProductUseCase from "./add-product.usecase"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Add Product usecase unit test", () => {
  it("should add a product", async () => {
    const productRepository = MockRepository()
    const usecase = new AddProductUseCase(productRepository)

    const input: AddProductInputDto = {
      name: "Product 1",
      purchasePrice: 10,
      description: "Description of product 1",
      stock: 10
    }

    const result = await usecase.execute(input)


    expect(productRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.purchasePrice).toBe(input.purchasePrice)
    expect(result.description).toBe(input.description)
    expect(result.stock).toBe(input.stock)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
  })
})