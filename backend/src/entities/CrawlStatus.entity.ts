import { Column, Entity } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ICrawlStatusAttribute } from './attributes/CrawlStatus.interface';

@Entity(ETableName.CRAWL_STATUS)
export class CrawlStatusEntity extends BaseEntityIncludeTime implements ICrawlStatusAttribute {
    @Column({ name: 'index', type: 'decimal' })
    index: number;

    @Column({ name: 'type', type: 'character varying' })
    type: string;
}
