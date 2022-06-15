import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ITransactionAttribute } from './attributes/Transaction.interface';

@Entity('transactions')
export class TransactionEntity extends BaseEntityIncludeTime implements ITransactionAttribute {
    @Column({ name: 'hash', type: 'character varying' })
    hash: string;

    @Column({ name: 'nonce', type: 'decimal' })
    nonce: number;

    @Column({ name: 'block_hash', type: 'character varying', nullable: true })
    blockHash?: string;

    @Column({ name: 'block_number', type: 'decimal', nullable: true })
    blockNumber?: number;

    @Column({ name: 'transaction_index', type: 'decimal', nullable: true })
    transactionIndex?: number;

    @Column({ name: 'from', type: 'character varying' })
    from: string;

    @Column({ name: 'to', type: 'character varying', nullable: true })
    to?: string;

    @Column({ name: 'value', type: 'character varying' })
    value: string;

    @Column({ name: 'gas_price', type: 'character varying' })
    gasPrice: string;

    @Column({ name: 'max_priority_fee_per_gas', type: 'decimal', nullable: true })
    maxPriorityFeePerGas?: number;

    @Column({ name: 'max_fee_per_gas', type: 'decimal', nullable: true })
    maxFeePerGas?: number;

    @Column({ name: 'gas', type: 'decimal' })
    gas: number;

    @Column({ name: 'input', type: 'character varying' })
    input: string;
}
