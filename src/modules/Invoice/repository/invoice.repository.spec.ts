import {Sequelize} from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice.entity";
import AddressValueObject from "../value-object/address.value-object";
import IdValueObject from "../../@shared/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";


const InvoiceItemProps1 = {
    id: new IdValueObject('1'),
    name: "Invoice Item 1",
    price: 100,
};

const InvoiceItemProps2 = {
    id: new IdValueObject('2'),
    name: "Invoice Item 2",
    price: 200,
};

const invoiceItems = [
    new InvoiceItem(InvoiceItemProps1),
    new InvoiceItem(InvoiceItemProps2),
];

const invoiceAddress = new AddressValueObject({
    street: "Street 1",
    number: "123",
    complement: "Complement 1",
    city: "City 1",
    state: "State 1",
    zipCode: "12345678",
})

const invoiceProps = {
    id: new IdValueObject('1'),
    name: "John Doe",
    document: "12345678900",
    address: invoiceAddress,
    items: invoiceItems,
};

describe("InvoiceRepository unit test", () => {

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

        const invoice = new Invoice(invoiceProps);

        const repository = new InvoiceRepository();
        const persistedInvoice = await repository.generate(invoice);

        expect(persistedInvoice.id.value).toBe("1");
        expect(persistedInvoice.name).toBe("John Doe");
        expect(persistedInvoice.document).toBe("12345678900");
        expect(persistedInvoice.address.street).toBe("Street 1");
        expect(persistedInvoice.address.number).toBe("123");
        expect(persistedInvoice.address.complement).toBe("Complement 1");
        expect(persistedInvoice.address.city).toBe("City 1");
        expect(persistedInvoice.address.state).toBe("State 1");
        expect(persistedInvoice.address.zipCode).toBe("12345678");
        expect(persistedInvoice.items.length).toBe(2);
        expect(persistedInvoice.createdAt).toBeDefined();
        expect(persistedInvoice.updatedAt).toBeDefined();
    });

    it("should find an invoice by id", async () => {

        const invoice = new Invoice(invoiceProps);

        const repository = new InvoiceRepository();
        const persistedInvoice = await repository.generate(invoice);

        const foundInvoice = await repository.findById("1");

        expect(foundInvoice.id.value).toBe("1");
        expect(foundInvoice.name).toBe("John Doe");
        expect(foundInvoice.document).toBe("12345678900");
        expect(foundInvoice.address.street).toBe("Street 1");
        expect(foundInvoice.address.number).toBe("123");
        expect(foundInvoice.address.complement).toBe("Complement 1");
        expect(foundInvoice.address.city).toBe("City 1");
        expect(foundInvoice.address.state).toBe("State 1");
        expect(foundInvoice.address.zipCode).toBe("12345678");
        expect(foundInvoice.items.length).toBe(2);
        expect(foundInvoice.createdAt).toBeDefined();
        expect(foundInvoice.updatedAt).toBeDefined();
    });

});