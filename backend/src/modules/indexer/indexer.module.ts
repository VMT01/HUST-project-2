import { Module } from '@nestjs/common';

import { ModelsModule } from '@shared/modules/services/models.module';
import { Web3Module } from '@shared/modules/web3/web3.module';

import { FetchService } from './providers/fetch.service';
import { IndexerManager } from './providers/indexer.service';

@Module({
    imports: [ModelsModule, Web3Module],
    providers: [IndexerManager, FetchService],
})
export class IndexerModule {}
