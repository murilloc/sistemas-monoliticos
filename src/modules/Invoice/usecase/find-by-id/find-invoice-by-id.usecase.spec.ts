import AddressValueObject from "../../value-object/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceByIdUsecase from "./find-invoice-by-id.usecase";

const address = new AddressValueObject({
    street: 'Rua Teste',
    number: '123',
    complement: 'Casa',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '12345-678',
});

const invoice = new Invoice({
    name: 'Teste',
    document: '12345678900',
    address: address,
    items: [
        new InvoiceItem({
            name: 'Item 1',
            price: 10,
        }),
        new InvoiceItem({
            name: 'Item 2',
            price: 20,
        }),
        new InvoiceItem({
            name: 'Item 3',
            price: 30,
        })
    ],
});


const MockProductRepository = () => {
    return {
        generate: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
}


describe('FindByIdUsecase unit test', () => {
    it('should find invoice by id', async () => {
        const invoiceRepository = MockProductRepository();

        const findByIdUsecase = new FindInvoiceByIdUsecase(invoiceRepository);

        const inputDto = {
            id: '1',
        }

        const invoiceFound = await findByIdUsecase.execute(inputDto);

        expect(invoiceRepository.findById).toHaveBeenCalled();
        expect(invoiceFound.name).toBe('Teste');
        expect(invoiceFound.document).toBe('12345678900');
        expect(invoiceFound.address.street).toBe('Rua Teste');
        expect(invoiceFound.address.number).toBe('123');
        expect(invoiceFound.address.complement).toBe('Casa');
        expect(invoiceFound.address.city).toBe('São Paulo');
        expect(invoiceFound.address.state).toBe('SP');
        expect(invoiceFound.address.zipCode).toBe('12345-678');
        expect(invoiceFound.items.length).toBe(3);
        expect(invoiceFound.items[0].name).toBe('Item 1');
        expect(invoiceFound.items[0].price).toBe(10);
        expect(invoiceFound.items[1].name).toBe('Item 2');
        expect(invoiceFound.items[1].price).toBe(20);
        expect(invoiceFound.items[2].name).toBe('Item 3');
        expect(invoiceFound.items[2].price).toBe(30);


        expect(invoiceFound.total).toBe(60);
    });


})