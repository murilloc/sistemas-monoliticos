import {AddProductFacadeInoutDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto} from "./product-adm.facade.dto";

export default interface ProductAdmFacadeInterface {

    addProduct(input: AddProductFacadeInoutDto): Promise<void>;

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}