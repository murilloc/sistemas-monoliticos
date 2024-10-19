import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import {FindInvoiceByIdUseCaseInputDTO, FindInvoiceByIdUseCaseOutputDTO} from "./find-invoice-by-id.usecase.dto";
import InvoiceGatewayInterface from "../../gateway/invoice.gateway";

export default class FindInvoiceByIdUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGatewayInterface) {
    }


    async execute(input: FindInvoiceByIdUseCaseInputDTO): Promise<FindInvoiceByIdUseCaseOutputDTO> {

        const invoice = await this.invoiceRepository.findById(input.id);

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,
            createdAt: invoice.createdAt,
        }
    }

};
