import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeInterface from "../facade/facade.interface";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const paymentGateway = new TransactionRepository();
        const processPaymentUsecase = new ProcessPaymentUseCase(paymentGateway);
        return new PaymentFacade(processPaymentUsecase);
    }
}