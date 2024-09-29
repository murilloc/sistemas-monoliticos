import {AddProductInputDto, AddProductOutputDto} from "./add-product.dto";
import Product from "../../domain/product.entity";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";
import ProductGateway from "../../gateway/product.gateway";

export default class AddProductUsecase {

    private _productRepository: ProductGateway;

    constructor(productGateway: ProductGateway) {
        this._productRepository = productGateway;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props = {
            id: new IdValueObject(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        }

        const product = new Product(props);
        await this._productRepository.add(product);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }

    }
}