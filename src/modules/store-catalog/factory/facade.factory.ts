import ProductRepository from "../repository/product.repository";
import FindByIdUsecase from "../usecase/find-by-id/find-by-id.usecase";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import StoreCatalogFacade from "../facade/store-catalog.facade";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findByIdUseCase = new FindByIdUsecase(productRepository);
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        return new StoreCatalogFacade({
            findByIdUseCase: findByIdUseCase,
            findAllProductsUseCase: findAllProductsUseCase
        });

    }

}