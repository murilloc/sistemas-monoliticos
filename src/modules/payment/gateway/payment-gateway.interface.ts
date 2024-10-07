import Transaction from "../domain/transaction.entity";

export default interface PaymentGatewayInterface {
    save(input: Transaction): Promise<Transaction>;
}