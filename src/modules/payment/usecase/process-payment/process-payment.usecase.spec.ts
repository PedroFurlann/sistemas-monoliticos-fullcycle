import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
})

const MockRepository  = () => {
  return {
    save: jest.fn().mockResolvedValue(transaction)
  }
}

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
})

const MockRepositoryDeclined  = () => {
  return {
    save: jest.fn().mockResolvedValue(transaction2)
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

  it("should decline a transaction", async () => {
    const transactionRepository = MockRepositoryDeclined()
    const usecase = new ProcessPaymentUseCase(transactionRepository)

    const input = {
      orderId: "1",
      amount: 50,
    }

    const result = await usecase.execute(input)

    expect(transactionRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.amount).toBe(50)
    expect(result.orderId).toBe("1")
    expect(result.status).toBe("declined")
    expect(result.createdAt).toEqual(transaction.createdAt)
    expect(result.updatedAt).toEqual(transaction.updatedAt)
  })
})