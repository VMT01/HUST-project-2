import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Web3Module } from '@shared/modules/web3/web3.module';

import { CrawlStatusRepository } from './providers/crawl-status.repository';
import { FetchService } from './providers/fetch.service';
import { IndexerManager } from './providers/indexer.service';

@Module({
    imports: [TypeOrmModule.forFeature([CrawlStatusRepository]), Web3Module],
    providers: [IndexerManager, FetchService],
})
export class IndexerModule {}
