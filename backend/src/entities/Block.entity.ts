import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IBlockAttribute } from './attributes/Block.interface';

@Entity('blocks')
export class BlockEntity extends BaseEntityIncludeTime implements IBlockAttribute {
    @Column()
    number: number;

    @Column()
    hash: string;

    @Column()
    parentHash: string;

    @Column()
    nonce: string;

    @Column()
    sha3Uncles: string;

    @Column()
    logsBloom: string;

    @Column({ nullable: true })
    transactionRoot?: string;

    @Column()
    stateRoot: string;

    @Column()
    receiptsRoot: string;

    @Column()
    miner: string;

    @Column()
    extraData: string;

    @Column()
    gasLimit: number;

    @Column()
    gasUsed: number;

    @Column()
    timestamp: string;

    @Column({ nullable: true })
    baseFeePerGas?: number;

    @Column()
    size: number;

    @Column()
    difficulty: number;

    @Column()
    totalDifficulty: number;

    @Column('character varying', { array: true })
    uncles: string[];
}
