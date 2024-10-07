import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import PaymentGatewayInterface from "../../gateway/payment-gateway.interface";
import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./process-payment.dto";
import Transaction from "../../domain/transaction.entity";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(private transactionRepository: PaymentGatewayInterface) {
    }


    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({amount: input.amount, orderId: input.orderId});

        transaction.process();

        const persistedTransaction = await this.transactionRepository.save(transaction);
        return {
            transactionId: persistedTransaction.id.value,
            status: persistedTransaction.status,
            orderId: persistedTransaction.orderId,
            amount: persistedTransaction.amount,
            createdAt: persistedTransaction.createdAt,
            updatedAt: persistedTransaction.updatedAt,
        }
    }
}