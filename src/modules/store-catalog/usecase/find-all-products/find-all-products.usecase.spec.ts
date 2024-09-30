import Product from "../../domain/product.entity";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
    id: new IdValueObject('1'),
    name: 'product name 1',
    description: 'product 1 description',
    salesPrice: 100
});

const product2 = new Product({
    id: new IdValueObject('2'),
    name: 'product name 2',
    description: 'product description 2',
    salesPrice: 200
});

const product3 = new Product({
    id: new IdValueObject('3'),
    name: 'product name 3',
    description: 'product description 3',
    salesPrice: 300
});

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2, product3]))
    };
}


describe('FindAllProductsUsecase unit test', () => {
    it('should return all products', async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products).toHaveLength(3);

        expect(result.products[0].id).toBe('1');
        expect(result.products[0].name).toBe('product name 1');
        expect(result.products[0].description).toBe('product 1 description');
        expect(result.products[0].salesPrice).toBe(100);

        expect(result.products[1].id).toBe('2');
        expect(result.products[1].name).toBe('product name 2');
        expect(result.products[1].description).toBe('product description 2');
        expect(result.products[1].salesPrice).toBe(200);

        expect(result.products[2].id).toBe('3');
        expect(result.products[2].name).toBe('product name 3');
        expect(result.products[2].description).toBe('product description 3');
        expect(result.products[2].salesPrice).toBe(300);

    });
});