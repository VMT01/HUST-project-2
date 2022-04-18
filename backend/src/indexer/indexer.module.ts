import {Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { FetchService } from './providers/fetch.service';
import { IndexerManager } from './providers/indexer.service';
@Module({
    providers:[IndexerManager,FetchService],
    imports:[Web3Module]
})
export class IndexerModule {}
