import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@config/config.module';

import { Web3Module } from '@shared/modules/web3/web3.module';

import { FetchService } from './providers/fetch.service';
import { IndexerManager } from './providers/indexer.service';

@Module({
    imports: [Web3Module, ConfigurationModule],
    providers: [IndexerManager, FetchService],
})
export class IndexerModule {}
