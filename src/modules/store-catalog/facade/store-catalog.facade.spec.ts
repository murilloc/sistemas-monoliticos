import {Sequelize} from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("StoreCatalogFacade unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(() => {
        sequelize.close();
    });

    it("should find a product by id", async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "product",
            description: "description",
            salesPrice: 10
        });

        const productFound = await facade.findById({id: "1"});


        expect(productFound.id).toBe("1");
        expect(productFound.name).toBe("product");
        expect(productFound.description).toBe("description");
        expect(productFound.salesPrice).toBe(10);

    });

    it("should find all products", async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "product 1",
            description: "product 1 description",
            salesPrice: 43.6
        });

        await ProductModel.create({
            id: "2",
            name: "product 2",
            description: "product 2 description",
            salesPrice: 23.8
        });

        await ProductModel.create({
            id: "3",
            name: "product 3",
            description: "product 3 description",
            salesPrice: 20.78
        });

        const productsFound = await facade.findAll();

        expect(productsFound.products).toHaveLength(3);
        expect(productsFound.products[0].id).toBe("1");
        expect(productsFound.products[1].id).toBe("2");
        expect(productsFound.products[2].id).toBe("3");

        expect(productsFound.products[0].name).toBe("product 1");
        expect(productsFound.products[1].name).toBe("product 2");
        expect(productsFound.products[2].name).toBe("product 3");

        expect(productsFound.products[0].description).toBe("product 1 description");
        expect(productsFound.products[1].description).toBe("product 2 description");
        expect(productsFound.products[2].description).toBe("product 3 description");

        expect(productsFound.products[0].salesPrice).toBe(43.6);
        expect(productsFound.products[1].salesPrice).toBe(23.8);
        expect(productsFound.products[2].salesPrice).toBe(20.78);




    });
});