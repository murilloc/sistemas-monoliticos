import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import IdValueObject from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    // id é obrigatório e deve ser do tipo IdValueObject
    id: IdValueObject;
    name: string;
    description: string;
    salesPrice: number;
}

export default class Product extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _description: string;
    private _salesPrice: number;

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._salesPrice = props.salesPrice;
    }


    // Getters
    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get salesPrice(): number {
        return this._salesPrice;
    }

}
