import ProductRepository from "../../repository/product.repository";
import {FindByIdInputDto, FindByIdOutputDto} from "./find-by-id.dto";

export default class FindByIdUsecase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(inputDto: FindByIdInputDto): Promise<FindByIdOutputDto> {
        const product = await this.productRepository.findById(inputDto.id);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
    }

}