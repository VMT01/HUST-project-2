import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockRepository } from '@modules/blocks/providers/block.repository';
import { TransactionRepository } from '@modules/transactions/providers/Transaction.repository';

import { Web3Module } from '@shared/modules/web3/web3.module';

import { CrawlStatusRepository } from './providers/crawl-status.repository';
import { FetchService } from './providers/fetch.service';
import { IndexerManager } from './providers/indexer.service';

@Module({
    imports: [TypeOrmModule.forFeature([CrawlStatusRepository, BlockRepository, TransactionRepository]), Web3Module],
    providers: [IndexerManager, FetchService],
})
export class IndexerModule {}
