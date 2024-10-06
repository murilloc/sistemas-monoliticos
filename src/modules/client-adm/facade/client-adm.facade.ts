import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import {FindClientByIdInputDto} from "../usecase/find-by-id/find-by-id.usecase.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";
import {AddClientFacadeInputDto, FindClientByIdFacadeOutputDto} from "./client-adm.facade.dto";


export interface UseCaseProps {
    addUsecase: UseCaseInterface;
    findByIdUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _findByIdUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._addUseCase = usecaseProps.addUsecase;
        this._findByIdUseCase = usecaseProps.findByIdUsecase
    }

    async addClient(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }

    async findClientById(input: FindClientByIdInputDto): Promise<FindClientByIdFacadeOutputDto> {
        return await this._findByIdUseCase.execute(input);
    }
}