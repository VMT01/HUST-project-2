import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { BlockEntity } from '@entities/Block.entity';

@EntityRepository(BlockEntity)
export class BlockRepository extends BaseRepository<BlockEntity> {
    protected alias: ETableName = ETableName.BLOCKS;
}
