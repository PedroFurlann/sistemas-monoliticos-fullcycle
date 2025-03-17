import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment Facade Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: "1",
      amount: 100,
    }

    const transaction = await facade.processPayment(input);

    expect(transaction.transactionId).toBeDefined();
    expect(transaction.status).toBe("approved");
    expect(transaction.amount).toBe(100);
    expect(transaction.orderId).toBe("1");
  })
});
