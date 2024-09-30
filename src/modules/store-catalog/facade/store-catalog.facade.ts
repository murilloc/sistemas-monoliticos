import FindByIdUsecase from "../usecase/find-by-id/find-by-id.usecase";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";
import {FindByIdOutputDto} from "../usecase/find-by-id/find-by-id.dto";
import {FindByIdStoreCatalogFacadeOutputDto} from "./store-catalog.facade.dto";
import {FindAllProductsOutputDto} from "../usecase/find-all-products/find-all-products.dto";

export interface UseCaseProps {
    findByIdUseCase: FindByIdUsecase,
    findAllProductsUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private findByIdUseCase: FindByIdUsecase;

    private findAllProductsUseCase: FindAllProductsUseCase;

    constructor(props: UseCaseProps) {
        this.findByIdUseCase = props.findByIdUseCase;
        this.findAllProductsUseCase = props.findAllProductsUseCase;
    }

    async findById(id: { id: string; }): Promise<FindByIdStoreCatalogFacadeOutputDto> {
        const outputDto = await this.findByIdUseCase.execute({id: id.id});
        return {
            id: outputDto.id,
            name: outputDto.name,
            description: outputDto.description,
            salesPrice: outputDto.salesPrice
        }
    }

    async findAll(): Promise<FindAllProductsOutputDto> {
        const outputDto = await this.findAllProductsUseCase.execute();
        return {
            products: outputDto.products
        }
    }


}