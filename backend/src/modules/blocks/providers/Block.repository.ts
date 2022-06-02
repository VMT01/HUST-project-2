import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { BlockEntity } from '@entities/Block.entity';

import { BlocksRequestDto } from './dtos/block-request.dto';

@EntityRepository(BlockEntity)
export class BlockRepository extends BaseRepository<BlockEntity> {
    protected alias: ETableName = ETableName.BLOCKS;

    async getBlocks(options: BlocksRequestDto) {
        const qb = this.createQb();
        qb.select([
            `${this.alias}.id`,
            `${this.alias}.number`,
            `${this.alias}.hash`,
            `${this.alias}.parentHash`,
            `${this.alias}.nonce`,
            `${this.alias}.sha3Uncles`,
            `${this.alias}.logsBloom`,
            `${this.alias}.transactionRoot`,
            `${this.alias}.stateRoot`,
            `${this.alias}.receiptsRoot`,
            `${this.alias}.miner`,
            `${this.alias}.extraData`,
            `${this.alias}.gasLimit`,
            `${this.alias}.gasUsed`,
            `${this.alias}.timestamp`,
            `${this.alias}.baseFeePerGas`,
            `${this.alias}.size`,
            `${this.alias}.difficulty`,
            `${this.alias}.totalDifficulty`,
            `${this.alias}.uncles`,
        ]);

        this.queryBuilderAddPagination(qb, options);
        return qb.getManyAndCount();
    }

    async getBlockByHash(hash: string) {
        const qb = this.createQb();
        qb.select([
            `${this.alias}.id`,
            `${this.alias}.number`,
            `${this.alias}.hash`,
            `${this.alias}.parentHash`,
            `${this.alias}.nonce`,
            `${this.alias}.sha3Uncles`,
            `${this.alias}.logsBloom`,
            `${this.alias}.transactionRoot`,
            `${this.alias}.stateRoot`,
            `${this.alias}.receiptsRoot`,
            `${this.alias}.miner`,
            `${this.alias}.extraData`,
            `${this.alias}.gasLimit`,
            `${this.alias}.gasUsed`,
            `${this.alias}.timestamp`,
            `${this.alias}.baseFeePerGas`,
            `${this.alias}.size`,
            `${this.alias}.difficulty`,
            `${this.alias}.totalDifficulty`,
            `${this.alias}.uncles`,
        ]).where(`${this.alias}.hash = :hash`, { hash });

        return qb.getOne();
    }
}
