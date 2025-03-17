import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client Adm Facade Test", () => {
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

  it("should create a client", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@example.com",
      address: "Address of client 1",
    };

    await clientFacade.add(input);

    const clientDb = await ClientModel.findOne({
      where: { id: input.id },
    });

    expect(input.id).toEqual(clientDb.id);
    expect(input.name).toEqual(clientDb.name);
    expect(input.email).toEqual(clientDb.email);
    expect(input.address).toEqual(clientDb.address);
  });

  it("should find a client", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "email@example.com",
      address: "Address of client 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      clientId: "1",
    };

    const client = await clientFacade.find(input);

    expect(client.id).toEqual("1");
    expect(client.name).toEqual("Client 1");
    expect(client.email).toEqual("email@example.com");
    expect(client.address).toEqual("Address of client 1");
  });
});
