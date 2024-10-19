import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGatewayInterface from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate.invoice.dto";
import Invoice from "../../domain/invoice.entity";
import IdValueObject from "../../../@shared/value-object/id.value-object";
import AddressValueObject from "../../value-object/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private _invoiceGateway;

    constructor(invoiceGateway: InvoiceGatewayInterface) {
        this._invoiceGateway = invoiceGateway;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const invoiceProps = {
            id: new IdValueObject(input.id),
            name: input.name,
            document: input.document,
            address: new AddressValueObject({
                street: input.street,
                complement: input.complement,
                number: input.number,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            items: input.items.map(item => new InvoiceItem({
                id: new IdValueObject(item.id),
                name: item.name,
                price: item.price,
            })),
        }

        const invoice = new Invoice(invoiceProps);
        const generatedInvoice = await this._invoiceGateway.generate(invoice);

        const items = [];
        for (const item of generatedInvoice.items) {
            const createdItem = {
                id: item.id.value,
                name: item.name,
                price: item.price,
            };
            items.push({
                id: createdItem.id,
                name: createdItem.name,
                price: createdItem.price,
            });
        }


        return {
            id: generatedInvoice.id.value,
            name: generatedInvoice.name,
            document: generatedInvoice.document,
            street: generatedInvoice.address.street,
            number: generatedInvoice.address.number,
            complement: generatedInvoice.address.complement,
            city: generatedInvoice.address.city,
            state: generatedInvoice.address.state,
            zipCode: generatedInvoice.address.zipCode,
            items: items,
            total: generatedInvoice.total,
        }
    }
};