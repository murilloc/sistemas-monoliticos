import InvoiceGatewayInterface from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import AddressValueObject from "../value-object/address.value-object";
import IdValueObject from "../../@shared/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceItemModel from "./invoice-item.model";

export default class InvoiceRepository implements InvoiceGatewayInterface {

    async findById(id: string): Promise<Invoice> {

        const invoice = await InvoiceModel.findByPk(id, {
            include: [
                {
                    model: InvoiceItemModel,
                    as: 'items',
                }
            ]
        });

        if (!invoice) {
            return null;
        }


        return new Invoice({
            id: new IdValueObject(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new AddressValueObject({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: invoice.items.map(item => new InvoiceItem({
                id: new IdValueObject(item.id),
                name: item.name,
                price: item.price,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }

    async generate(invoice: Invoice): Promise<Invoice> {


        const createdInvoice = await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            total: invoice.total,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const createdItems = await Promise.all(invoice.items.map(item => InvoiceItemModel.create({
            id: item.id.value,
            name: item.name,
            price: item.price,
            invoiceId: createdInvoice.id,
        })));

        return new Invoice({
            id: new IdValueObject(createdInvoice.id),
            name: createdInvoice.name,
            document: createdInvoice.document,
            address: new AddressValueObject({
                street: createdInvoice.street,
                number: createdInvoice.number,
                complement: createdInvoice.complement,
                city: createdInvoice.city,
                state: createdInvoice.state,
                zipCode: createdInvoice.zipCode,
            }),
            items: createdItems.map(item => new InvoiceItem({
                id: new IdValueObject(item.id),
                name: item.name,
                price: item.price,
            })),
            createdAt: createdInvoice.createdAt,
            updatedAt: createdInvoice.updatedAt,
        });
    }

}