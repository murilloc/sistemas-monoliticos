import Product from "../../domain/product.entity";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";
import CheckStockUsecase from "./check-stock.usacase";

const product = new Product({
    id: new IdValueObject('1'),
    name: 'Product 1',
    purchasePrice: 100,
    description: 'Description product 1',
    stock: 10,
});

const MockProductRepository = () => {
    return {
        add: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe('CheckStockUsecase unit test', () => {
    it('should check stock of a product', async () => {
        const productRepository = MockProductRepository();
        const checkStockUsecase = new CheckStockUsecase(productRepository);
        const input = {id: "1"};

        const result = await checkStockUsecase.execute(input);

        expect(productRepository.findById).toHaveBeenCalled();
        expect(result.id).toBe(product.id.value);
        expect(result.stock).toBe(product.stock);
    })
});