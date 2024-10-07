import IdValueObject from "../../@shared/domain/value-object/id.value-object";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type TransactionProps = {
    id?: IdValueObject;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAd?: Date;
}

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id);
        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || 'pending';
        this.validate();
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }
    }

    approve(): void {
        this._status = 'approved';
    }

    decline(): void {
        this._status = 'declined';
    }

    async process(): Promise<this> {
        if (this._amount >= 100) {
            this.approve();
            return this;
        } else {
            this.decline();
            return this;
        }
    }

    get amount(): number {
        return this._amount;
    }

    get orderId(): string {
        return this._orderId;
    }

    get status(): string {
        return this._status;
    }


}

