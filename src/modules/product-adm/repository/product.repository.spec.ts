import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../domain/product.entity";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";

describe("ProductRepository unit test", () => {

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


    it("should add a product", async () => {
        const productProps = {
            id: new IdValueObject("1"),
            name: "Product 1",
            description: "Description of product 1",
            purchasePrice: 10.0,
            stock: 10,
        }
        const product = new Product(productProps);
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({where: {id: productProps.id.value}});
        expect(productProps.id.value).toBe(productDb.id);
        expect(productProps.name).toBe(productDb.name);
        expect(productProps.description).toBe(productDb.description);
        expect(productProps.purchasePrice).toBe(productDb.purchasePrice);
        expect(productProps.stock).toBe(productDb.stock);

    });

    it("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description of product 1",
            purchasePrice: 10.0,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.findById("1");

        expect(product).not.toBeNull();
        expect(product.id.value).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Description of product 1");
        expect(product.purchasePrice).toBe(10.0);
        expect(product.stock).toBe(10);

    });




});