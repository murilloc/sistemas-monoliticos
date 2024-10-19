import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import IdValueObject from "../../@shared/value-object/id.value-object";

type InvoiceItemProps = {
    id?: IdValueObject;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class InvoiceItem extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemProps) {
        super(props.id);
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get value(): string {
        return `${this._name}, ${this._price}`;
    }



}