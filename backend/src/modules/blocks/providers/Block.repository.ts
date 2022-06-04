import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { BlockEntity } from '@entities/Block.entity';

//import { BlocksRequestDto } from './dtos/block-request.dto';
import { IPagination } from '@shared/interfaces/pagination.interface';

export interface BlockQueryParams extends IPagination {
    id?: number;
    hash?: string;
    number?: number;
}

@EntityRepository(BlockEntity)
export class BlockRepository extends BaseRepository<BlockEntity> {
    protected alias: ETableName = ETableName.BLOCKS;
    buildQueryBuilder(params: BlockQueryParams) {
        const { id, hash, number } = params;
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
        if (id) qb.where(`${this.alias}.id = :id`, { id });
        if (hash) qb.where(`${this.alias}.hash = :hash`, { hash });
        if (number) qb.where(`${this.alias}.number = :number`, { number });

        return qb;
    }
    async getMany(options: BlockQueryParams) {
        const qb = this.buildQueryBuilder(options);

        this.queryBuilderAddPagination(qb, options);
        return await qb.getManyAndCount();
    }

    async getOne(options: BlockQueryParams) {
        const qb = this.buildQueryBuilder(options);
        return await qb.getOne();
    }
}
