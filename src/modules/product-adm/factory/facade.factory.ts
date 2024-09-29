import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import CheckStockUsecase from "../usecase/check-stock/check-stock.usacase";

export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUsecase = new AddProductUsecase(productRepository);
        const checkStockUsecase = new CheckStockUsecase(productRepository);
        return new ProductAdmFacade({addUsecase: addProductUsecase, checkStockUsecase: checkStockUsecase});
    }

}