import {Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import {Col} from "sequelize/types/utils";
import {BelongsTo} from "sequelize";

@Table({
    tableName: 'invoice_item',
    timestamps: false,
})

export default class InvoiceItemModel extends Model {

    @PrimaryKey
    @Column({allowNull: false,})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false, type: DataType.FLOAT})
    declare price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({allowNull: false, })
    declare invoiceId: string;

    @UpdatedAt
    @Column({allowNull: false})
    declare updatedAt: Date;

    @CreatedAt
    @Column({allowNull: false})
    declare createdAt: Date;

}