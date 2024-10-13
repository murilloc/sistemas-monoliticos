import ProductRepository from "../../repository/product.repository";
import {FindByIdInputDto, FindByIdOutputDto} from "./find-by-id.dto";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";

export default class FindByIdUsecase implements UseCaseInterface {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: FindByIdInputDto): Promise<FindByIdOutputDto> {

        class InputDto implements FindByIdInputDto {
            id: string;

            constructor(id: string) {
                this.id = id;
            }
        }

        const inputDto = new InputDto(input.id);

        const product = await this.productRepository.findById(inputDto.id);

        class OutputDto implements FindByIdOutputDto {
            id: string;
            name: string;
            description: string;
            salesPrice: number;

            constructor(id: string, name: string, description: string, salesPrice: number) {
                this.id = id;
                this.name = name;
                this.description = description;
                this.salesPrice = salesPrice;
            }
        }

        return new OutputDto(product.id.value, product.name, product.description, product.salesPrice);

    }

}