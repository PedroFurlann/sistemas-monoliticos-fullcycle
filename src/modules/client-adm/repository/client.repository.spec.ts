import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "email@example.com",
      address: "Address of client 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();

    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  })

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "example@example.com",
      address: "Address of client 1",
    })

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: client.id.id },
    });

    expect(client.id.id).toEqual(clientDb.id);
    expect(client.name).toEqual(clientDb.name);
    expect(client.email).toEqual(clientDb.email);
    expect(client.address).toEqual(clientDb.address);
    expect(client.createdAt).toEqual(clientDb.createdAt);
    expect(client.updatedAt).toEqual(clientDb.updatedAt);
  })
})