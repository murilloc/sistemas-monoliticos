import ProductGateway from "../gateway/product.gateway";
import Product from "../domain/product.entity";
import {ProductModel} from "./product.model";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGateway {

    async add(product: Product): Promise<void> {

        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    async findById(id: string): Promise<Product> {
        const product = await ProductModel.findOne({where: {id}});
        if (!product) {

            throw new Error(`Product with id ${id} not found`);
        }

        return new Product({
            id: new IdValueObject(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
        });
    };
}
