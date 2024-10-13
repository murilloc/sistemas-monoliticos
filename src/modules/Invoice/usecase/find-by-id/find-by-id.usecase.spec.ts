import IdValueObject from "../../../@shared/value-object/id.value-object";
import AddressValueObject from "../../value-object/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindByIdInvoiceUseCase from "./find-by-id.usecase";

describe('FindInvoiceUsecase unit test', () => {


    it('should find an invoice', async () => {

        const invoice = new Invoice({
            id: new IdValueObject('1'),
            name: 'John Doe',
            document: '123456789',
            address: new AddressValueObject({
                street: 'Main Street',
                number: '100',
                complement: 'Apartment 101',
                city: 'New York',
                state: 'NY',
                zipCode: '123456',
            }),
            items: [
                new InvoiceItem({
                    id: new IdValueObject('1'),
                    name: 'Item 1',
                    price: 100,
                    invoiceId: '1'
                }),
                new InvoiceItem({
                    id: new IdValueObject('2'),
                    name: 'Item 2',
                    price: 50,
                    invoiceId: '1'
                }),
                new InvoiceItem({
                    id: new IdValueObject('3'),
                    name: 'Item 3',
                    price: 25,
                    invoiceId: '1'
                })
            ],
        });

        const MockInvoiceRepository = () => {
            return {
                generate: jest.fn(),
                findById: jest.fn().mockReturnValue(Promise.resolve(invoice)),
            }
        }

        const invoiceRepository = MockInvoiceRepository();
        const findInvoiceUsecase = new FindByIdInvoiceUseCase(invoiceRepository);
        const inputDto = {id: "1"};

        const result = await findInvoiceUsecase.execute(inputDto);

        expect(invoiceRepository.findById).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.value);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
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