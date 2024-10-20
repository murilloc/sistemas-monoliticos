import InvoiceFacadeInterface from "./invoice.facade.interface";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import FindInvoiceByIdUsecase from "../usecase/find-by-id/find-invoice-by-id.usecase";
import {
    FindInvoiceByIdFacadeInputDTO,
    FindInvoiceByIdFacadeOutputDTO,
    GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.dto";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private generateInvoiceUsecase: GenerateInvoiceUseCase,
        private findInvoiceByIdUsecase: FindInvoiceByIdUsecase
    ) {
    }

    async findInvoiceById(input: FindInvoiceByIdFacadeInputDTO): Promise<FindInvoiceByIdFacadeOutputDTO> {
        return this.findInvoiceByIdUsecase.execute(input);
    }

    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this.generateInvoiceUsecase.execute(input);
    }


}