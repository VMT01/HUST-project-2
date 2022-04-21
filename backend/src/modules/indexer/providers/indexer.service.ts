import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockTransactionObject } from 'web3-eth';

import { EEnvKey } from '@constants/env.constant';

import { CrawlStatusRepository } from './crawl-status.repository';
import { FetchService } from './fetch.service';

@Injectable()
export class IndexerManager {
    private startBlock: number;

    constructor(
        private readonly indexer: FetchService,
        private readonly configService: ConfigService,
        private readonly crawlStatusRepo: CrawlStatusRepository,
    ) {}

    async start(): Promise<void> {
        // prepare indexer
        await this.prepare();

        // init fetch service.
        // this.indexer.start(this.startBlock, this.indexBlock);
    }

    async prepare() {
        console.info('prepare indexer!');
        
        // restore start block from db or .env
        const envStartBlock = this.configService.get<number>(EEnvKey.START_BLOCK);
        const blockStatus = await this.crawlStatusRepo.findOne({ type: 'block' });
        const dbStartBlock = blockStatus.index;
        
        this.startBlock = Math.max(envStartBlock, dbStartBlock);
    }

    async indexBlock(block: BlockTransactionObject) {
        console.log(block);
    }
}
