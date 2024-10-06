import Client from "../../domail/client.entity";
import FindClientByIdUsecase from "./find-by-id.usecase";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";

const client = new Client({
    id: new IdValueObject("1"),
    name: 'John Doe',
    email: 'jhondoe@client.com',
    address: '1234 Main St',
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
}

describe('FindClientByIdUsecase unit test', () => {

    it('should find a client by id', async () => {
        const repository = MockRepository();
        const usecase = new FindClientByIdUsecase(repository);
        const input = {id: "1"};

        const result = await usecase.execute(input);

        expect(repository.findById).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });


});

