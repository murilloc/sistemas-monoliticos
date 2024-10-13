import {InvoiceFacadeInterface} from "./invoice.facade.interface";
import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import {
    FindByIdInvoiceFacadeInputDto, FindByIdInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.dto";


export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(private findByIdInvoiceUsecase: UseCaseInterface,
                private generateInvoiceUsecase: UseCaseInterface) {
    }

    async findById(input: FindByIdInvoiceFacadeInputDto): Promise<FindByIdInvoiceFacadeOutputDto> {
        return this.findByIdInvoiceUsecase.execute(input);
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this.generateInvoiceUsecase.execute(input);
    }


}