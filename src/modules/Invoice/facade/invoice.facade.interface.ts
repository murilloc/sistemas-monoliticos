import {
    FindInvoiceByIdFacadeInputDTO, FindInvoiceByIdFacadeOutputDTO,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.dto";

export default interface InvoiceFacadeInterface {
    findInvoiceById(input: FindInvoiceByIdFacadeInputDTO): Promise<FindInvoiceByIdFacadeOutputDTO>;
    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}