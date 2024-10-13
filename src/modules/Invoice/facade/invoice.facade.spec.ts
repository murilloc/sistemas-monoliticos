import {Sequelize} from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";


const inputDto = {
    name: "John Doe",
    document: "123456789",
    street: "Main Street",
    number: "100",
    complement: "Apartment 101",
    city: "New York",
    state: "NY",
    zipCode: "123456",
    items: [
        {
            id: "1",
            name: "Item 1",
            price: 100,
        },
        {
            id: "1",
            name: "Item 2",
            price: 50,
        },
        {
            id: "3",
            name: "Item 3",
            price: 25,
        }
    ]
}

describe("InvoiceFacade unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(() => {
        sequelize.close();
    });


    it("should generate an invoice", async () => {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
        const output = await generateInvoiceUseCase.execute(inputDto);

        expect(output.id).toBeDefined();
        expect(output.name).toBe(inputDto.name);
        expect(output.document).toBe(inputDto.document);
        expect(output.street).toBe(inputDto.street);
        expect(output.number).toBe(inputDto.number);
        expect(output.complement).toBe(inputDto.complement);
        expect(output.city).toBe(inputDto.city);
        expect(output.state).toBe(inputDto.state);
        expect(output.zipCode).toBe(inputDto.zipCode);
        expect(output.items).toBe(inputDto.items);
        expect(output.total).toBe(175);
    });
});
