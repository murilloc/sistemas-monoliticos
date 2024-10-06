import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import {FindClientByIdInputDto, FindClientByIdOutputDto} from "./find-by-id.usecase.dto";

export default class FindClientByIdUsecase implements UseCaseInterface {
    private repository: ClientGateway;

    constructor(repository: ClientGateway) {
        this.repository = repository;
    }

    async execute(input: FindClientByIdInputDto): Promise<FindClientByIdOutputDto> {

        const client = await this.repository.findById(input.id);

        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
}