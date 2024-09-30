import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductGateway from "../gateway/product.gateway";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";


export default class ProductRepository implements ProductGateway {

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map(
            (product) =>
                new Product({
                    id: new IdValueObject(product.id),
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice,
                })
        );
    }

    async findById(id: string): Promise<Product> {

        const product = await ProductModel.findByPk(id);

        return new Product({
            id: new IdValueObject(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });
    }
}