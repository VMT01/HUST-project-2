import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ITransactionAttribute } from './attributes/Transaction.interface';

@Entity('transactions')
export class TransactionEntity extends BaseEntityIncludeTime implements ITransactionAttribute {
    @Column()
    hash: string;

    @Column()
    nonce: number;

    @Column({ nullable: true })
    blockHash?: string;

    @Column({ nullable: true })
    blockNumber?: number;

    @Column({ nullable: true })
    transactionIndex?: number;

    @Column()
    from: string;

    @Column()
    to?: string;

    @Column()
    value: string;

    @Column()
    gasPrice: string;

    @Column({ nullable: true })
    maxPriorityFeePerGas?: number;

    @Column({ nullable: true })
    maxFeePerGas?: number;

    @Column()
    gas: number;

    @Column()
    input: string;
}
