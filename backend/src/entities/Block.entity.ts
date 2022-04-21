import { BaseEntityIncludeTime } from '@core/base-entity';
import { Column, Entity } from 'typeorm';

import { IBlockAttribute } from './attributes/BlockEntity.interface';

@Entity('blocks')
export class BlockEntity extends BaseEntityIncludeTime implements IBlockAttribute {
    @Column()
    blockHash: string;
    
    @Column()
    blockNumber: number;
    
    @Column()
    difficulty: string;
    
    @Column()
    gasLimit: number;
    
    @Column()
    gasUsed: number;
    
    @Column()
    logsBloom: string;
    
    @Column()
    miner: string;
    
    @Column()
    nonce: string;
    
    @Column()
    parentHash: string;
    
    @Column()
    receiptsRoot: string;
    
    @Column()
    sha3Uncles: string;
    
    @Column()
    size: number;
    
    @Column()
    stateRoot: string;
    
    @Column()
    timestamp: string;
    
    @Column()
    totalDifficulty: string;
}
