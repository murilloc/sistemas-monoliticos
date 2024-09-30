import {
    FindAllStoreCatalogFacadeOutputDto,
    FindByIdStoreCatalogFacadeInputDto,
    FindByIdStoreCatalogFacadeOutputDto,

} from "./store-catalog.facade.dto";


export default interface StoreCatalogFacadeInterface {
    findById(id: FindByIdStoreCatalogFacadeInputDto): Promise<FindByIdStoreCatalogFacadeOutputDto>;

    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
}