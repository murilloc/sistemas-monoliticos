import {
    AddClientFacadeInputDto,
    FindClientByIdFacadeInputDto,
    FindClientByIdFacadeOutputDto
} from "./client-adm.facade.dto";


export default interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInputDto): Promise<void>;

    findClientById(input: FindClientByIdFacadeInputDto): Promise<FindClientByIdFacadeOutputDto>;
}