import ProductGateway from "../../gateway/product.gateway";
import {FindAllProductsOutputDto} from "./find-all-products.dto";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";

export default class FindAllProductsUseCase implements UseCaseInterface {
    private productGateway;

    constructor(productGateway: ProductGateway) {
        this.productGateway = productGateway;
    }

    async execute(): Promise<FindAllProductsOutputDto> {
        const products = await this.productGateway.findAll();
        return {
            products: products.map((product) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })),
        };
    }
}