import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import {AddClientInputDto, AddClientOutputDto} from "./add-client.usecase.dto";
import ClientGateway from "../../gateway/client.gateway";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domail/client.entity";

export default class AddClientUseCase implements UseCaseInterface {

    private _repository: ClientGateway;

    constructor(repository: ClientGateway) {
        this._repository = repository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

        const props = {
            id: new IdValueObject(input.id),
            name: input.name,
            email: input.email,
            address: input.address
        }

        const client = new Client(props);

        await this._repository.add(client);

        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }

    }
}