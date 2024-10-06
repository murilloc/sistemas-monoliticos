import IdValueObject from "../value-object/id.value-object";

export default class BaseEntity {
    private _id: IdValueObject;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: IdValueObject, createdAt?: Date, updatedAt?: Date) {
        this._id = id || new IdValueObject();
        this._createdAt = createdAt || new Date();
        this._updatedAt = updatedAt || new Date();

    }

    get id(): IdValueObject {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }


}