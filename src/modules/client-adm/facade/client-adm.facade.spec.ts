import {ClientModel} from "../repository/client.model";
import {Sequelize} from "sequelize-typescript";
import ClientRepository from "../repository/client.respository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindByIdUsecase from "../usecase/find-by-id/find-by-id.usecase";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";
import AddProductUsecase from "../../product-adm/usecase/add-product/add-product.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe('ClientAdmFacade unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });
        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should add a client', async () => {
        const repository = new ClientRepository();
        const addClientUsecase = new AddClientUseCase(repository);

        const facade = new ClientAdmFacade({
            addUsecase: addClientUsecase,
            findByIdUsecase: undefined,
        });


        const input = {
            name: 'John Doe',
            email: 'jhondow@client.com',
            address: '1234 Main St',
        };
        await facade.addClient(input);

        const client = await ClientModel.findOne({where: {name: input.name}});
        expect(client).not.toBeNull();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
        expect(client.createdAt).not.toBeNull();
        expect(client.updatedAt).not.toBeNull();

    });

    it("should find a client by id", async () => {
        const repository = new ClientRepository();
        const addClientUsecase = new AddClientUseCase(repository);
        const findByIdUsecase = new FindByIdUsecase(repository);


        const facade = new ClientAdmFacade({
            addUsecase: addClientUsecase,
            findByIdUsecase: findByIdUsecase,
        });

        const input = {
            id: '1',
            name: 'John Doe',
            email: 'jhondoe@client.com',
            address: '1234 Main St',
        };

        await facade.addClient(input);

        const client = await facade.findClientById({id: input.id});

        expect(client).not.toBeNull();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    });

    it("should return a client adm facade", () => {
        const facade =ClientAdmFacadeFactory.create();
        expect(facade).toBeInstanceOf(ClientAdmFacade);
        expect(facade).toHaveProperty('_addUseCase');
        expect(facade).toHaveProperty('_findByIdUseCase');
    });

});