import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import InvoiceFacade from "../facade/invoice.facade";
import FindInvoiceByIdUsecase from "../usecase/find-by-id/find-invoice-by-id.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUsecase = new GenerateInvoiceUseCase(invoiceRepository);
        const findInvoiceByIdUsecase = new FindInvoiceByIdUsecase(invoiceRepository);
        return new InvoiceFacade(generateInvoiceUsecase, findInvoiceByIdUsecase);
    }
 }