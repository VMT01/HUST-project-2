import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { CrawlStatusEntity } from '@entities/CrawlStatus.entity';

@EntityRepository(CrawlStatusEntity)
export class CrawlStatusRepository extends BaseRepository<CrawlStatusEntity> {
    protected alias: ETableName = ETableName.CRAWL_STATUS;
}
