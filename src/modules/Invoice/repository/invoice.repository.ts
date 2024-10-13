import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import IdValueObject from "../../@shared/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceItemModel from "./invoice-item.model";
import AddressValueObject from "../value-object/address.value-object";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<Invoice> {
        const createdInvoice = await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        for (const item of invoice.items) {
            await InvoiceItemModel.create({
                id: item.id.value,
                name: item.name,
                price: item.price,
                invoiceId: createdInvoice.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        return await this.findById(createdInvoice.id);
    }

    async findById(id: string): Promise<Invoice> {
        const populatedInvoice = await InvoiceModel.findByPk(id, {
            include: [{ model: InvoiceItemModel }],
        });

        if (!populatedInvoice) {
            throw new Error("Invoice not found");
        }

        const items = populatedInvoice.items.map(item => new InvoiceItem({
            id: new IdValueObject(item.id),
            name: item.name,
            price: item.price,
            invoiceId: item.invoiceId,
        }));

        return new Invoice({
            id: new IdValueObject(populatedInvoice.id),
            name: populatedInvoice.name,
            document: populatedInvoice.document,
            address: new AddressValueObject({
                street: populatedInvoice.address.street,
                number: populatedInvoice.address.number,
                complement: populatedInvoice.address.complement,
                city: populatedInvoice.address.city,
                state: populatedInvoice.address.state,
                zipCode: populatedInvoice.address.zipCode,
            }),
            items: items,
            createdAt: populatedInvoice.createdAt,
            updatedAt: populatedInvoice.updatedAt,
        });
    }
}