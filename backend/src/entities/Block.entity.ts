import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IBlockAttribute } from './attributes/Block.interface';

@Entity('blocks')
export class BlockEntity extends BaseEntityIncludeTime implements IBlockAttribute {
    @Column({ name: 'number', type: 'integer' })
    number: number;

    @Column({ name: 'number', type: 'character varying' })
    hash: string;

    @Column({ name: 'parent_hash', type: 'character varying' })
    parentHash: string;

    @Column({ name: 'nonce', type: 'character varying' })
    nonce: string;

    @Column({ name: 'sha3_uncles', type: 'character varying' })
    sha3Uncles: string;

    @Column({ name: 'logs_bloom', type: 'character varying' })
    logsBloom: string;

    @Column({ name: 'transaction_root', type: 'character varying', nullable: true })
    transactionRoot?: string;

    @Column({ name: 'state_root', type: 'character varying' })
    stateRoot: string;

    @Column({ name: 'receipts_root', type: 'character varying' })
    receiptsRoot: string;

    @Column({ name: 'miner', type: 'character varying' })
    miner: string;

    @Column({ name: 'extra_data', type: 'character varying' })
    extraData: string;

    @Column({ name: 'gas_limit', type: 'integer' })
    gasLimit: number;

    @Column({ name: 'gas_used', type: 'integer' })
    gasUsed: number;

    @Column({ name: 'timestamp', type: 'character varying' })
    timestamp: string;

    @Column({ name: 'base_fee_per_gas', type: 'integer', nullable: true })
    baseFeePerGas?: number;

    @Column({ name: 'size', type: 'integer' })
    size: number;

    @Column({ name: 'difficulty', type: 'integer' })
    difficulty: number;

    @Column({ name: 'total_difficulty', type: 'integer' })
    totalDifficulty: number;

    @Column({ name: 'uncles', type: 'character varying', array: true })
    uncles: string[];
}
