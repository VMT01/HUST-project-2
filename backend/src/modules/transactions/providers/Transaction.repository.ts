import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { TransactionEntity } from '@entities/Transaction.entity';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends BaseRepository<TransactionEntity> {
    protected alias: ETableName = ETableName.TRANSACTIONS;
}
