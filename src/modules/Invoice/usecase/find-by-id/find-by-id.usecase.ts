import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindByIdInvoiceUseCaseInputDto, FindByIdInvoiceUseCaseOutputDto} from "./find-by-id.dto";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";


export default class FindByIdInvoiceUseCase implements UseCaseInterface {

    private invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this.invoiceRepository = invoiceRepository;
    }

    async execute(inputDto: FindByIdInvoiceUseCaseInputDto): Promise<FindByIdInvoiceUseCaseOutputDto> {
        const invoice = await this.invoiceRepository.findById(inputDto.id);

        // mapping Entity to Dto
        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: invoice.address,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,
            createdAt: invoice.createdAt
        }
    };
}
