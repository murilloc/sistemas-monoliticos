import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import IdValueObject from "../../../@shared/value-object/id.value-object";

const outputInvoice = {
    id: new IdValueObject('1'),
    name: 'Teste',
    document: '12345678900',
    address: {
        street: 'Rua Teste',
        number: '123',
        complement: 'Casa',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345-678',
    },
    items: [
        {
            id: new IdValueObject('1'),
            name: 'Item 1',
            price: 10,
        },
        {
            id: new IdValueObject('2'),
            name: 'Item 2',
            price: 20,
        },
        {
            id: new IdValueObject('3'),
            name: 'Item 3',
            price: 30,
        }
    ],
    total: 60,
}



const MockProductRepository = () => {

    return {
        generate: jest.fn().mockReturnValue(Promise.resolve(outputInvoice)),
        findById: jest.fn(),
    }
}

describe('GenerateInvoiceUsecase unit test', () => {
    it('should generate invoice', async () => {
        const invoiceRepository = MockProductRepository();

        const generateInvoiceUsecase = new GenerateInvoiceUseCase(invoiceRepository);

        const inputInvoice = {
            name: 'Teste',
            document: '12345678900',
            street: 'Rua Teste',
            number: '123',
            complement: 'Casa',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '12345-678',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    price: 10,
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 20,
                },
                {
                    id: '3',
                    name: 'Item 3',
                    price: 30,
                }
            ],
            total: 60,
        }

        const invoiceGenerated = await generateInvoiceUsecase.execute(inputInvoice);

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(invoiceGenerated.id).toBe(outputInvoice.id.value);
        expect(invoiceGenerated.name).toBe(outputInvoice.name);
        expect(invoiceGenerated.document).toBe(outputInvoice.document);
        expect(invoiceGenerated.street).toBe(outputInvoice.address.street);
        expect(invoiceGenerated.number).toBe(outputInvoice.address.number);
        expect(invoiceGenerated.complement).toBe(outputInvoice.address.complement);
        expect(invoiceGenerated.city).toBe(outputInvoice.address.city);
        expect(invoiceGenerated.state).toBe(outputInvoice.address.state);
        expect(invoiceGenerated.zipCode).toBe(outputInvoice.address.zipCode);
        expect(invoiceGenerated.items[0].id).toBe(outputInvoice.items[0].id.value);
        expect(invoiceGenerated.items[0].name).toBe(outputInvoice.items[0].name);
        expect(invoiceGenerated.items[0].price).toBe(outputInvoice.items[0].price);
        expect(invoiceGenerated.items[1].id).toBe(outputInvoice.items[1].id.value);
        expect(invoiceGenerated.items[1].name).toBe(outputInvoice.items[1].name);
        expect(invoiceGenerated.items[1].price).toBe(outputInvoice.items[1].price);
        expect(invoiceGenerated.items[2].id).toBe(outputInvoice.items[2].id.value);
        expect(invoiceGenerated.items[2].name).toBe(outputInvoice.items[2].name);
        expect(invoiceGenerated.items[2].price).toBe(outputInvoice.items[2].price);
        expect(invoiceGenerated.total).toBe(outputInvoice.total);


    })
});