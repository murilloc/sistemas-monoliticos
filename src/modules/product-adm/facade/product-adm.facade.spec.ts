import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();

    });

    it("should create a product", async () => {


        const productAdmFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "product 1",
            description: "Product description 1",
            purchasePrice: 10,
            stock: 10
        }


        await productAdmFacade.addProduct(input);

        const product = await ProductModel.findByPk("1");
        expect(product).not.toBeNull();
        expect(product.id).toBe("1");
        expect(product.name).toBe("product 1");
        expect(product.description).toBe("Product description 1");
        expect(product.purchasePrice).toBe(10);
        expect(product.stock).toBe(10);

    });

    it("should check stock of a product", async () => {
        const productAdmFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "product 1",
            description: "Product description 1",
            purchasePrice: 10,
            stock: 10
        }

        await productAdmFacade.addProduct(input);

        const output = await productAdmFacade.checkStock({id: "1"});

        expect(output.id).toBe(input.id);
        expect(output.stock).toBe(input.stock);
    });

});