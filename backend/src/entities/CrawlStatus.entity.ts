import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ICrawlStatusAttribute } from './attributes/CrawlStatus.interface';

@Entity('crawl_status')
export class CrawlStatusEntity extends BaseEntityIncludeTime implements ICrawlStatusAttribute {
    @Column({ name: 'index', type: 'integer' })
    index: number;

    @Column({ name: 'type', type: 'character varying' })
    type: string;
}
