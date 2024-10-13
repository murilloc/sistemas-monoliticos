import InvoiceFacade from "../facade/invoice.facade";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import FindByIdInvoiceUseCase from "../usecase/find-by-id/find-by-id.usecase";
import InvoiceRepository from "../repository/invoice.repository";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
        const findByIdInvoiceUseCase = new FindByIdInvoiceUseCase(invoiceRepository);

        return new InvoiceFacade(generateInvoiceUseCase, findByIdInvoiceUseCase);


    }
}