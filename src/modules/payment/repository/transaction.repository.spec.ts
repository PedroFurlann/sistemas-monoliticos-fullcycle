import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionRepository from "./transaction.repository";

describe("Transaction Repository Test", () => {
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

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      orderId: "1",
      amount: 100,
    })

    transaction.process();

    const repository = new TransactionRepository();

    const result = await repository.save(transaction);

    expect(result.id.id).toEqual(transaction.id.id);
    expect(result.orderId).toEqual(transaction.orderId);
    expect(result.amount).toEqual(transaction.amount);
    expect(result.status).toEqual("approved");
  });
});
