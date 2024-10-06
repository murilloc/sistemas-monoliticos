import ClientGateway from "../../gateway/client.gateway";
import AddClientUsecase from "./add-client.usecase";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";

const MockRepository = () => {
    return {
        add: jest.fn(),
        findById: jest.fn(),
    };
}

describe('AddClientUsecase unit test', () => {

    it('should add a client', async () => {
        const repository: ClientGateway = MockRepository();
        const usecase: AddClientUsecase = new AddClientUsecase(repository);

        const input = {
            name: 'John Doe',
            email: 'client@email.com',
            address: '1234 Main St',
        };

        const result = await usecase.execute(input);

        expect(repository.add).toBeCalled();
        expect(result).toHaveProperty('id');
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);

    });

    it("should create a client created with id", async () => {
        const repository: ClientGateway = MockRepository();
        const usecase: AddClientUsecase = new AddClientUsecase(repository);

        const client = {
            id: '1',
            name: 'John Doe',
            email: 'jhondoe@email.com',
            address: '1234 Main St',
        };

        const result = await usecase.execute(client);

        expect(result).toHaveProperty('id');
        expect(result.id).toEqual(client.id);
    });
});
