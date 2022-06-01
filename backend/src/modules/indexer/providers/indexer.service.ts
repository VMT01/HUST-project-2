import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockTransactionObject } from 'web3-eth';

import { EEnvKey } from '@constants/env.constant';

import { TransactionEntity } from '@entities/Transaction.entity';

import { BlockRepository } from '@modules/blocks/providers/block.repository';
import { TransactionRepository } from '@modules/transactions/providers/Transaction.repository';

import { CrawlStatusRepository } from './crawl-status.repository';
import { FetchService } from './fetch.service';

@Injectable()
export class IndexerManager {
    private startBlock: number;

    constructor(
        private readonly fetchService: FetchService,
        private readonly configService: ConfigService,
        private readonly crawlStatusRepo: CrawlStatusRepository,
        private readonly blockRepo: BlockRepository,
        private readonly transactionRepo: TransactionRepository,
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
        const blockStatus = await this.blockRepo.createQueryBuilder().orderBy('number','DESC').getOne();
        const dbStartBlock = blockStatus?.number ?? 1;

        this.startBlock = Math.max(envStartBlock, dbStartBlock);
    }

    async indexBlock(block: BlockTransactionObject) {
        const newBlock = this.blockRepo.create({
            number: block.number,
            hash: block.hash,
            parentHash: block.parentHash,
            nonce: block.nonce,
            sha3Uncles: block.sha3Uncles,
            logsBloom: block.logsBloom,
            transactionRoot: block.transactionRoot,
            stateRoot: block.stateRoot,
            receiptsRoot: block.receiptsRoot,
            miner: block.miner,
            extraData: block.extraData,
            gasLimit: block.gasLimit,
            gasUsed: block.gasUsed,
            timestamp: block.timestamp + '',
            baseFeePerGas: block.baseFeePerGas,
            size: block.size,
            difficulty: block.difficulty,
            totalDifficulty: block.totalDifficulty,
            uncles: block.uncles,
        });

        const transactions: TransactionEntity[] = [];
        block.transactions.forEach(transaction => {
            const newTransaction = this.transactionRepo.create({
                hash: transaction.hash,
                nonce: transaction.nonce,
                blockHash: transaction.blockHash,
                blockNumber: transaction.blockNumber,
                transactionIndex: transaction.transactionIndex,
                from: transaction.from,
                to: transaction.to,
                value: transaction.value,
                gasPrice: transaction.gasPrice,
                maxPriorityFeePerGas: transaction.maxPriorityFeePerGas && +transaction.maxPriorityFeePerGas,
                maxFeePerGas: transaction.maxFeePerGas && +transaction.maxFeePerGas,
                gas: transaction.gas,
                input: transaction.input,
            });
            transactions.push(newTransaction);
        });

        await Promise.all([this.blockRepo.save(newBlock), this.transactionRepo.save(transactions)]);
    }
}
