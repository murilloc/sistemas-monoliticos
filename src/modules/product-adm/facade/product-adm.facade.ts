import ProductAdmFacadeInterface from "./product-adm.facade.interface";
import {AddProductFacadeInoutDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto} from "./product-adm.facade.dto";
import UseCaseInterface from "../../@shared/usecase/usecase.interface";

export interface UseCaseProps{
    addUsecase:UseCaseInterface;
    checkStockUsecase:UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps){
        this._addUsecase = usecaseProps.addUsecase;
        this._checkStockUsecase = usecaseProps.checkStockUsecase;

    }

    addProduct(input: AddProductFacadeInoutDto): Promise<void> {
        // só é possível porque o dto do caso de uso é igual ao dto da fachada
        // caso contrário, seria necessário fazer um mapeamento entre os dtos
        return this._addUsecase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}