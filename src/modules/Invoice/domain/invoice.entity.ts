import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import AddressValueObject from "../value-object/address.value-object";
import IdValueObject from "../../@shared/value-object/id.value-object";
import InvoiceItem from "./invoice-item.entity";

type InvoiceProps = {
    id?: IdValueObject;
    name: string;
    document: string;
    address: AddressValueObject;
    items: InvoiceItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: AddressValueObject;
    private _items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): AddressValueObject {
        return this._address;
    }

    get items(): InvoiceItem[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

    get value(): string {
        return `${this._name}, ${this._document}, ${this._address.value}, ${this.total}`;
    }

}