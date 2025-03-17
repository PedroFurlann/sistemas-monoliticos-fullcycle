import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
})

const MockRepository  = () => {
  return {
    save: jest.fn().mockResolvedValue(transaction)
  }
}

describe("Process Payment Use Case Unit Test", () => {
  it("should process a payment", async () => {
    const transactionRepository = MockRepository()
    const usecase = new ProcessPaymentUseCase(transactionRepository)

    const input = {
      orderId: "1",
      amount: 100,
    }

    const result = await usecase.execute(input)

    expect(transactionRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.amount).toBe(100)
    expect(result.orderId).toBe("1")
    expect(result.status).toBe("approved")
    expect(result.createdAt).toEqual(transaction.createdAt)
    expect(result.updatedAt).toEqual(transaction.updatedAt)
  })
})