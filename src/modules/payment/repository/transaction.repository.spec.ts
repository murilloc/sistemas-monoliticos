import {Sequelize} from "sequelize-typescript";
import Transaction from "../domain/transaction.entity";
import TransactionModel from "./transaction.model";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";
import TransactionRepository from "./transaction.repository";

describe("TransactionRepository unit test", () => {
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

    it("should save a approved transaction", async () => {
        const transaction = new Transaction({
            id: new IdValueObject("1"),
            orderId: "1",
            amount: 100,
        });

        await transaction.process();

        const repository = new TransactionRepository();

        const persistedTransaction = await repository.save(transaction);

        expect(persistedTransaction.id.value).toBe("1");
        expect(persistedTransaction.orderId).toBe("1");
        expect(persistedTransaction.amount).toBe(100);
        expect(persistedTransaction.status).toBe("approved");
        expect(persistedTransaction.createdAt).not.toBeNull();
        expect(persistedTransaction.updatedAt).not.toBeNull();

    });

    it("should save a declined transaction", async () => {
        const transaction = new Transaction({
            id: new IdValueObject("1"),
            orderId: "1",
            amount: 50,
        });

        await transaction.process();

        const repository = new TransactionRepository();

        const persistedTransaction = await repository.save(transaction);

        expect(persistedTransaction.id.value).toBe("1");
        expect(persistedTransaction.orderId).toBe("1");
        expect(persistedTransaction.amount).toBe(50);
        expect(persistedTransaction.status).toBe("declined");
        expect(persistedTransaction.createdAt).not.toBeNull();
        expect(persistedTransaction.updatedAt).not.toBeNull();
    });
});