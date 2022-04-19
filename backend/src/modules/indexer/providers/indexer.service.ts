import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockTransactionObject } from 'web3-eth';

import { EEnvKey } from '@constants/env.constant';

import { FetchService } from './fetch.service';

@Injectable()
export class IndexerManager {
    private startBlock: number;

    constructor(private indexer: FetchService, private configService: ConfigService) {}

    async start(): Promise<void> {
        // prepare indexer
        await this.prepare();

        // init fetch service.
        this.indexer.start(this.startBlock, this.indexBlock);
    }

    async prepare() {
        console.info('prepare indexer!');
        // restore start block from db or .env
        const envStartBlock = this.configService.get<string>(EEnvKey.START_BLOCK);
        const dbStartBlock = 1;
        this.startBlock = Math.max(parseInt(envStartBlock), dbStartBlock);
    }

    async indexBlock(block: BlockTransactionObject): Promise<void> {
        console.log(block);
    }
}
