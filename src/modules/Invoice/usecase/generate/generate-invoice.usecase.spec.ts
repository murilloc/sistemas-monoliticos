import IdValueObject from "../../../@shared/value-object/id.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const invoiceAddress = {
    street: 'Main Street',
    number: '100',
    complement: 'Apartment 101',
    city: 'New York',
    state: 'NY',
    zipCode: '123456',
}
const invoice = {
    id: new IdValueObject(),
    name: 'John Doe',
    document: '123456789',
    address: invoiceAddress,
    items: [
        {
            id: new IdValueObject("1"),
            name: 'Item 1',
            price: 100,
        },
        {
            id: new IdValueObject("2"),
            name: 'Item 2',
            price: 50,
        },
        {
            id: new IdValueObject("3"),
            name: 'Item 3',
            price: 25,
        }
    ],
    total: 175,
}

describe('GenerateInvoiceUsecase unit test', () => {
    it('should generate an invoice', async () => {

        const MockInvoiceRepository = () => {
            return {
                generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
                findById: jest.fn(),
            }
        }

        const invoiceRepository = MockInvoiceRepository();
        const generateInvoiceUsecase = new GenerateInvoiceUseCase(invoiceRepository);

        const invoiceInputDto = {
            name: invoice.name,
            document: invoice.document,
            ...invoiceAddress,
            items: invoice.items.map(item => {
                return {
                    id: item.id.value,
                    name: item.name,
                    price: item.price,
                }
            })
        }

        const result = await generateInvoiceUsecase.execute(invoiceInputDto);

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.address.street);
        expect(result.number).toBe(invoice.address.number);
        expect(result.complement).toBe(invoice.address.complement);
        expect(result.city).toBe(invoice.address.city);
        expect(result.state).toBe(invoice.address.state);
        expect(result.zipCode).toBe(invoice.address.zipCode);

        expect(result.items[0].id).toBe(invoice.items[0].id.value);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.value);

        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.items[2].id).toBe(invoice.items[2].id.value);

        expect(result.items[2].name).toBe(invoice.items[2].name);
        expect(result.items[2].price).toBe(invoice.items[2].price);

        expect(result.total).toBe(invoice.total);

    });
});