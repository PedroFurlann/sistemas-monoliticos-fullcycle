import Id from "../../../@shared/domain/value-object/id.value-object";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Add Client usecase unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository()
    const addClientUseCase = new AddClientUseCase(clientRepository)

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@example.com",
      address: "Address of client 1"
    }

    const result = await addClientUseCase.execute(input)

    expect(clientRepository.add).toHaveBeenCalled()
    expect(result.id).toBe(input.id)
    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.address).toBe(input.address)
  })
});