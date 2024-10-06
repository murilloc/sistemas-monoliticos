import ClientGateway from "../gateway/client.gateway";
import Client from "../domail/client.entity";
import {ClientModel} from "./client.model";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }

    async findById(id: string): Promise<Client> {
        const client = await ClientModel.findOne({where: {id}});
        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }

        return new Client({
            id: new IdValueObject(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }
}