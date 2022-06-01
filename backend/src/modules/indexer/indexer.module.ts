import { Module } from '@nestjs/common';


import { Web3Module } from '@shared/modules/web3/web3.module';

import { FetchService } from './providers/fetch.service';
import { IndexerManager } from './providers/indexer.service';
import { ModelsModule } from '@shared/modules/services/models.module';

@Module({
    imports: [ModelsModule, Web3Module],
    providers: [IndexerManager, FetchService],
})
export class IndexerModule {}
