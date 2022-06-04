import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockTransactionObject } from 'web3-eth';

import { EEnvKey } from '@constants/env.constant';

import { TransactionEntity } from '@entities/Transaction.entity';

import BlockService from '@shared/modules/services/providers/block.service';
import TransactionService from '@shared/modules/services/providers/transaction.service';

import { FetchService } from './fetch.service';

@Injectable()
export class IndexerManager {
    private startBlock: number;

    constructor(
        private readonly fetchService: FetchService,
        private readonly configService: ConfigService,
        private readonly blockService: BlockService,
        private readonly transactionService: TransactionService,
    ) {}

    async start(): Promise<void> {
        // prepare indexer
        await this.prepare();

        // init fetch service.
        this.fetchService.start(this.startBlock, this.indexBlock.bind(this));
    }

    async prepare() {
        console.info('prepare indexer!');

        // restore start block from db or .env
        const envStartBlock = this.configService.get<number>(EEnvKey.START_BLOCK);
        // db
        const response = await this.blockService.getOne({ isLatest: true });
        const dbStartBlock = response?.number ?? 1;
        this.startBlock = Math.max(envStartBlock, dbStartBlock);
    }

    async indexBlock(block: BlockTransactionObject) {
        await Promise.all([this.blockService.createOne(block), this.transactionService.createMany(block.transactions)]);
    }
}
