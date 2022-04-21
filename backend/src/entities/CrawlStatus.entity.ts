import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ICrawlStatusAttribute } from './attributes/CrawlStatus.interface';

@Entity('crawl_status')
export class CrawlStatusEntity extends BaseEntityIncludeTime implements ICrawlStatusAttribute {
    @Column()
    index: number;

    @Column()
    type: string;
}
