import ProductGateway from "../../gateway/product.gateway";
import {CheckStockInputDto, CheckStockOutputDto} from "./check-stock.dto";

export default class CheckStockUsecase {

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