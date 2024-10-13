import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceRepository from "./invoice.repository";
import IdValueObject from "../../@shared/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import AddressValueObject from "../value-object/address.value-object";
import InvoiceItem from "../domain/invoice-item.entity";

describe('InvoiceRepository unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();

    });

    it("should generate an invoice", async () => {
        const address = new AddressValueObject({
            street: "Rua 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345678"
        });

        const items = [
            new InvoiceItem({
                id: new IdValueObject("1"),
                name: "Product 1",
                price: 10.0,
                invoiceId: "1"
            }),
            new InvoiceItem({
                id: new IdValueObject("2"),
                name: "Product 2",
                price: 20.0,
                invoiceId: "1"
            }),
            new InvoiceItem({
                id: new IdValueObject("3"),
                name: "Product 3",
                price: 30.0,
                invoiceId: "1"
            })
        ];

        const invoice = new Invoice({
            id: new IdValueObject("1"),
            name: "Invoice 1",
            document: "123456789",
            address,
            items
        });

        const invoiceRepository = new InvoiceRepository();
        const createdInvoice = await invoiceRepository.generate(invoice);

        expect(createdInvoice).toBeDefined();
        expect(createdInvoice.id.value).toBe(invoice.id.value);
        expect(createdInvoice.name).toBe(invoice.name);
        expect(createdInvoice.document).toBe(invoice.document);
        expect(createdInvoice.address.street).toBe(invoice.address.street);
        expect(createdInvoice.address.number).toBe(invoice.address.number);
        expect(createdInvoice.address.complement).toBe(invoice.address.complement);
        expect(createdInvoice.address.city).toBe(invoice.address.city);
        expect(createdInvoice.address.state).toBe(invoice.address.state);
        expect(createdInvoice.address.zipCode).toBe(invoice.address.zipCode);
        expect(createdInvoice.items.length).toBe(3);
        expect(createdInvoice.items[0].name).toBe(items[0].name);
        expect(createdInvoice.items[0].price).toBe(items[0].price);
        expect(createdInvoice.items[1].name).toBe(items[1].name);
        expect(createdInvoice.items[1].price).toBe(items[1].price);
    });


});