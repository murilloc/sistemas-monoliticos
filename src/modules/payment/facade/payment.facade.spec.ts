import {Sequelize} from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("PaymentFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction", async () => {

        const paymentFacade = PaymentFacadeFactory.create();
        const input = {
            orderId: "order_id_1",
            amount: 100,
        }

        const output = await paymentFacade.processPayment(input);

        expect(output.transactionId).not.toBeNull();
        expect(output.status).toBe("approved");
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.createdAt).not.toBeNull();
        expect(output.updatedAt).not.toBeNull();
    });
})