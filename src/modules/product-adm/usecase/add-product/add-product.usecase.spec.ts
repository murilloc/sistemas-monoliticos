import AddProductUsecase from "./add-product.usecase";

const MockProductRepository = () => {
    return {
        add: jest.fn(),
        findById: jest.fn(),
    }
}

describe("AddProductUsecase unit test", () => {
    it("should add a product", async () => {
        // repository
        const productRepository = MockProductRepository();
        const usecase = new AddProductUsecase(productRepository);

        const input = {
            name: "Product 1",
            description: "Description of product 1",
            purchasePrice: 10.0,
            stock: 10,
        }
        const result =  await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })
});