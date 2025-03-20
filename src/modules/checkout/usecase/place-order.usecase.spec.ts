import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe("Place Order Use Case Unit Test", () => {
  describe("execute method", () => {
    it("should throw an error when client is not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null)
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase()
      //@ts-expect-error - force set client facade
      placeOrderUseCase["_clientFacade"] = mockClientFacade

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: []
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrowError("Client not found")
    })
  })
})