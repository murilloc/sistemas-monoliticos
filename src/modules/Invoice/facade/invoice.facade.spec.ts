import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import {Sequelize} from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";


const inputInvoice = {
    id: '1',
    name: 'John Doe',
    document: '12345678900',
    street: 'Street 1',
    number: '123',
    complement: 'Complement 1',
    city: 'City 1',
    state: 'State 1',
    zipCode: '12345678',
    items: [
        {
            id: '1',
            name: 'Invoice Item 1',
            price: 100,
        },
        {
            id: '2',
            name: 'Invoice Item 2',
            price: 200,
        }
    ]
};


describe("InvoiceFacade unit test", () => {
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

    it("should find an invoice by id", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();
        await invoiceFacade.generateInvoice(inputInvoice);

        const foundInvoice = await invoiceFacade.findInvoiceById({id: inputInvoice.id});

        expect(foundInvoice.name).toBe(inputInvoice.name);
        expect(foundInvoice.document).toBe(inputInvoice.document);
        expect(foundInvoice.address.street).toBe(inputInvoice.street);
        expect(foundInvoice.address.number).toBe(inputInvoice.number);
        expect(foundInvoice.address.complement).toBe(inputInvoice.complement);
        expect(foundInvoice.address.city).toBe(inputInvoice.city);
        expect(foundInvoice.address.state).toBe(inputInvoice.state);
        expect(foundInvoice.address.zipCode).toBe(inputInvoice.zipCode);
        expect(foundInvoice.items.length).toBe(2);
        expect(foundInvoice.items[0].id).toBe(inputInvoice.items[0].id);
        expect(foundInvoice.items[0].name).toBe(inputInvoice.items[0].name);
        expect(foundInvoice.items[0].price).toBe(inputInvoice.items[0].price);
        expect(foundInvoice.items[1].id).toBe(inputInvoice.items[1].id);
        expect(foundInvoice.items[1].name).toBe(inputInvoice.items[1].name);
        expect(foundInvoice.items[1].price).toBe(inputInvoice.items[1].price);
        expect(foundInvoice.total).toBe(300);
        expect(foundInvoice.createdAt).toBeDefined();
    });

    it("should generate an invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();
        const generatedInvoice = await invoiceFacade.generateInvoice(inputInvoice);

        expect(generatedInvoice.name).toBe(inputInvoice.name);
        expect(generatedInvoice.document).toBe(inputInvoice.document);
        expect(generatedInvoice.street).toBe(inputInvoice.street);
        expect(generatedInvoice.number).toBe(inputInvoice.number);
        expect(generatedInvoice.complement).toBe(inputInvoice.complement);
        expect(generatedInvoice.city).toBe(inputInvoice.city);
        expect(generatedInvoice.state).toBe(inputInvoice.state);
        expect(generatedInvoice.zipCode).toBe(inputInvoice.zipCode);
        expect(generatedInvoice.items.length).toBe(2);
        expect(generatedInvoice.items[0].id).toBe(inputInvoice.items[0].id);
        expect(generatedInvoice.items[0].name).toBe(inputInvoice.items[0].name);
        expect(generatedInvoice.items[0].price).toBe(inputInvoice.items[0].price);
        expect(generatedInvoice.items[1].id).toBe(inputInvoice.items[1].id);
        expect(generatedInvoice.items[1].name).toBe(inputInvoice.items[1].name);
        expect(generatedInvoice.items[1].price).toBe(inputInvoice.items[1].price);
        expect(generatedInvoice.total).toBe(300);
    });
});