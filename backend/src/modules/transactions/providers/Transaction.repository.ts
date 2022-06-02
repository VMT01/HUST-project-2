import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { TransactionEntity } from '@entities/Transaction.entity';

import { TxnsRequestDto } from './dtos/txn-request.dto';

@EntityRepository(TransactionEntity)
export class TxnRepository extends BaseRepository<TransactionEntity> {
    protected alias: ETableName = ETableName.TRANSACTIONS;

    async getTxns(options: TxnsRequestDto) {
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
        this.queryBuilderAddPagination(qb, options);
        return qb.getManyAndCount();
    }

    async getTxnByHash(hash: string) {
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
        ]).where(`${this.alias}.hash = :hash`, { hash });

        return qb.getOne();
    }
}
