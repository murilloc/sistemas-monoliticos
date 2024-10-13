import {
    FindByIdInvoiceFacadeInputDto,
    FindByIdInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.dto";

export interface InvoiceFacadeInterface {
    findById(input: FindByIdInvoiceFacadeInputDto): Promise<FindByIdInvoiceFacadeOutputDto>;

    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}