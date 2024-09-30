import Product from "../../domain/product.entity";
import IdValueObject from "../../../@shared/domain/value-object/id.value-object";
import FindByIdUsecase from "./find-by-id.usecase";

const product = new Product({
    id: new IdValueObject("1"),
    name: "Product 1",
    description: "Description of product 1",
    salesPrice: 10.0,
});

const MockProductRepository = () => {
    return {
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
}

describe("FindByIdUsecase use case", () => {
    it("should find product by id", async () => {
        const productRepository = MockProductRepository();

        const findByIdUsecase = new FindByIdUsecase(productRepository);

        const inputDto = {
            id: "1",
        }

        const productFound = await findByIdUsecase.execute(inputDto);

        expect(productRepository.findById).toHaveBeenCalled();
        expect(productFound.id).toBe("1");
        expect(productFound.name).toBe("Product 1");
        expect(productFound.description).toBe("Description of product 1");
        expect(productFound.salesPrice).toBe(10.0);
    });
});
