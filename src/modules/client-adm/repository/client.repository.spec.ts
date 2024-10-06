import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "./client.model";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";
import Client from "../domail/client.entity";
import ClientRepository from "./client.respository";

describe('ClientRepository unit test', () => {
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


    it('should find a client', async () => {

        const client = await ClientModel.create({
            id: '1',
            name: 'John Doe',
            email: 'jhondoe@client.com',
            address: '1234 Main St',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientRepository = new ClientRepository();
        const result = await clientRepository.findById(client.id)

        expect(result).toBeInstanceOf(Client);
        expect(result.id.value).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });

    it('should add a client', async () => {
        const clientProps = {
            id: new IdValueObject('1'),
            name: 'John Doe',
            email: 'jhondoe@client.com',
            address: '1234 Main St',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const client = new Client(clientProps);
        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({where: {id: clientProps.id.value}});
        expect(clientProps.id.value).toEqual(clientDb.id);
        expect(clientProps.name).toEqual(clientDb.name);
        expect(clientProps.email).toEqual(clientDb.email);
        expect(clientProps.address).toEqual(clientDb.address);
        expect(clientProps.createdAt).toStrictEqual(clientDb.createdAt);
        expect(clientProps.updatedAt).toStrictEqual(clientDb.updatedAt);
    });

});