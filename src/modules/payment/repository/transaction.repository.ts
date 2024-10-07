import PaymentGatewayInterface from "../gateway/payment-gateway.interface";
import Transaction from "../domain/transaction.entity";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGatewayInterface {
    async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.id.value,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        return new Transaction({
            id: input.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAd: input.updatedAt,
        })
    }
}
