import Invoice from "../domain/invoice.entity";


export default interface InvoiceGatewayInterface {
    generate(invoice: Invoice): Promise<Invoice>;

    findById(id: string): Promise<Invoice>;
}