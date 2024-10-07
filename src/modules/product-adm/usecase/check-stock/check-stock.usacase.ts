import ProductGateway from "../../gateway/product.gateway";
import {CheckStockInputDto, CheckStockOutputDto} from "./check-stock.dto";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";

export default class CheckStockUsecase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(productGateway: ProductGateway) {
        this._productRepository = productGateway;
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._productRepository.findById(input.id);

        return {
            id: product.id.value,
            stock: product.stock,
        }
    }
}