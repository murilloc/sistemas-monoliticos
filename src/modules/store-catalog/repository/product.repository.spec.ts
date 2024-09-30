import {Sequelize} from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description of product 1",
            salesPrice: 10.0,
        });

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Description of product 2",
            salesPrice: 20.0,
        });

        const products = await productRepository.findAll();

        expect(products.length).toBe(2);

        expect(products[0].id.value).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Description of product 1");
        expect(products[0].salesPrice).toBe(10.0);

        expect(products[1].id.value).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Description of product 2");
        expect(products[1].salesPrice).toBe(20.0);


    });

    it("should find product by id", async () => {
        const productRepository = new ProductRepository();

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description of product 1",
            salesPrice: 10.0,
        });

        const product = await productRepository.findById("1");

        expect(product.id.value).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Description of product 1");
        expect(product.salesPrice).toBe(10.0);
    });
});
