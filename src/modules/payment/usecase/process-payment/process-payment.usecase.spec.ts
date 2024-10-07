import Transaction from "../../domain/transaction.entity";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";
import ProcessPaymentUseCase from "./process-payment.usecase";

const approvedTransaction = new Transaction({
    id: new IdValueObject('1'),
    orderId: '1',
    amount: 100,
});

const declinedTransaction = new Transaction({
    id: new IdValueObject('1'),
    orderId: '1',
    amount: 50,
});

const MockRepository = ((status: string) => {
    if (status === 'approved') {
        return {
            save: jest.fn().mockReturnValue(Promise.resolve(approvedTransaction.process()))
        }
    } else if(status === 'declined') {
        return {
            save: jest.fn().mockReturnValue(Promise.resolve(declinedTransaction.process()))
        };
    }
});


describe("ProcessPaymentUseCase unit test", () => {

    it("should approve a transaction", async () => {
        const paymentRepository = MockRepository("approved");
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: '1',
            amount: 100,
        }

        const result = await useCase.execute(input);
        expect(paymentRepository.save).toBeCalled();
        expect(result.transactionId).toBe(approvedTransaction.id.value);
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(approvedTransaction.amount);
        expect(result.orderId).toBe(approvedTransaction.orderId);
        expect(result.createdAt).toBe(approvedTransaction.createdAt);
        expect(result.updatedAt).toBe(approvedTransaction.updatedAt);
    });

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepository("declined");
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: '1',
            amount: 50,
        }

        const result = await useCase.execute(input);
        expect(paymentRepository.save).toBeCalled();
        expect(result.transactionId).toBe(declinedTransaction.id.value);
        expect(result.status).toBe('declined');
        expect(result.amount).toBe(declinedTransaction.amount);
        expect(result.orderId).toBe(declinedTransaction.orderId);
        expect(result.createdAt).toBe(declinedTransaction.createdAt);
        expect(result.updatedAt).toBe(declinedTransaction.updatedAt);
    });
});
