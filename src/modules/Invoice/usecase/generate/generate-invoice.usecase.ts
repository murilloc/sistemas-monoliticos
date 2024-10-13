import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import Invoice from "../../domain/invoice.entity";
import IdValueObject from "../../../@shared/value-object/id.value-object";
import AddressValueObject from "../../value-object/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this.invoiceRepository = invoiceRepository;
    }

    async execute(data: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const invoiceAddress = new AddressValueObject({
            street: data.street,
            number: data.number,
            complement: data.complement,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode
        });



        // Mapping input data to Invoice entity
        const input = new Invoice({
            name: data.name,
            document: data.document,
            address: invoiceAddress,
            items: data.items.map(item => new InvoiceItem({
                id: new IdValueObject(item.id),
                name: item.name,
                price: item.price,
                invoiceId: new IdValueObject().value
            }))
        })


        const invoice = await this.invoiceRepository.generate(input);


        // Mapping Invoice entity to output data
        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => {
                return {
                    id: item.id.value,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total,
        }
    }
}