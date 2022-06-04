import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { TransactionEntity } from '@entities/Transaction.entity';

import { TxnsRequestDto } from './dtos/txn-request.dto';

@EntityRepository(TransactionEntity)
export class TxnRepository extends BaseRepository<TransactionEntity> {
    protected alias: ETableName = ETableName.TRANSACTIONS;
    buildQueryBuilder(options: TxnsRequestDto) {
        const { hash } = options;
        const qb = this.createQb();
        qb.select([
            `${this.alias}.id`,
            `${this.alias}.hash`,
            `${this.alias}.blockHash`,
            `${this.alias}.blockNumber`,
            `${this.alias}.transactionIndex`,
            `${this.alias}.from`,
            `${this.alias}.to`,
            `${this.alias}.value`,
            `${this.alias}.gasPrice`,
            `${this.alias}.maxPriorityFeePerGas`,
            `${this.alias}.maxFeePerGas`,
            `${this.alias}.gas`,
            `${this.alias}.input`,
        ]);
        if (hash) qb.where(`${this.alias}.hash = :hash`, { hash });
        return qb;
    }
    async getMany(options: TxnsRequestDto) {
        const qb = this.buildQueryBuilder(options);

        this.queryBuilderAddPagination(qb, options);
        return await qb.getManyAndCount();
    }

    async getOne(options: TxnsRequestDto) {
        const qb = this.buildQueryBuilder(options);

        return await qb.getOne();
    }
}
