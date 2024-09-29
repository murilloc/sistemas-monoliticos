import ValueObject from "./value-object.interface";
import {v4 as uuidv4} from 'uuid';

export default class IdValueObject implements ValueObject {
    private readonly _value: string;

    constructor(value?: string) {
        this._value = value || uuidv4();
    }

    get value(): string {
        return this._value;
    }

    equals(id: IdValueObject): boolean {
        return this._value === id.value;
    }
}