import {Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import AddressValueObject from "../value-object/address.value-object";
import InvoiceItemModel from "./invoice-item.model";


@Table({
    tableName: 'invoice',
    timestamps: false,
})

export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare document: string;

    @Column({
        type: DataType.JSON,
        allowNull: false
    })
    declare address: AddressValueObject;

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];

    @UpdatedAt
    @Column({allowNull: false})
    declare updatedAt: Date;

    @CreatedAt
    @Column({allowNull: false})
    declare createdAt: Date;


}