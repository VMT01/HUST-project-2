import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import * as lodash from 'lodash';
import { BlockHandler } from 'types/common-types';
import { FetchResult } from 'types/web3-types';

import { ECrawlerConfig } from '@constants/crawler.constant';

import { BlockedQueue } from '@shared/class-helper/BlockedQueue';
import { Connection } from '@shared/modules/web3/providers/web3.service';
import { delay } from '@shared/utils/promise';

@Injectable()
export class FetchService {
    private isStopped = false;
    private lastProcessingHeight: number;
    private latestBlockHeight: number;
    private startBlock = 1;
    private Buffer: BlockedQueue<number>;

    constructor(private api: Connection) {
        this.Buffer = new BlockedQueue<number>(ECrawlerConfig.BATCH_SIZE);
    }

    async start(startBlock: number, handler: BlockHandler) {
        await this.init(startBlock);
        await Promise.all([this.fillBuffer(), this.takeBuffer(handler)]);
    }

    async fillBuffer() {
        while (!this.isStopped) {
            if (this.Buffer.freeSize > 0 && this.lastProcessingHeight < this.latestBlockHeight) {
                const start = this.lastProcessingHeight + 1;
                const end = Math.min(
                    this.Buffer.freeSize + this.lastProcessingHeight,
                    this.latestBlockHeight - this.lastProcessingHeight + start - 1,
                );
                const blocksBuffer = lodash.range(start, end + 1, 1);
                this.Buffer.putAll(blocksBuffer);
                // update lastProcessingHeight.
                await this.syncLatestProcessedBlock(end);
            } else {
                // wait for takeBuffer.
                await delay(ECrawlerConfig.DELAY_TIME);
                continue;
            }
        }
    }

    async takeBuffer(handler: BlockHandler) {
        while (!this.isStopped) {
            if (this.Buffer.size <= 0) {
                // wait for fillBuffer.
                await delay(ECrawlerConfig.DELAY_TIME);
                continue;
            }

            const batch = await this.Buffer.takeAll(ECrawlerConfig.TAKE_COUNT);
            const response = await this.fetchBatchBlocks(batch);

            // process blocks
            response.forEach(async result => {
                if (result.status) {
                    handler(result.block);
                } else {
                    console.error('Block index error, height = ', result.height);
                }
            });
        }
    }

    async init(startBlock: number): Promise<void> {
        this.startBlock = startBlock;
        this.latestBlockHeight = await this.api.getLatestBlockHeight();
        this.lastProcessingHeight = this.startBlock - 1;
    }

    async syncLatestProcessedBlock(height: number): Promise<void> {
        this.lastProcessingHeight = height;
    }
    @Interval(15 * 1000)
    async syncLatestBlockWithDB() {
        //     const blockStatus = await this.crawlStatusRepo.findOne({ type: 'block' });
        //     const currentBlock = await this.blockRepo.createQueryBuilder().orderBy('number','DESC').getOne();
        //     blockStatus.index = currentBlock?.number ?? 1;
        //    return await this.crawlStatusRepo.save(blockStatus);
    }
    @Interval(15 * 1000)
    async synclatestBlockEthereum() {
        return (this.latestBlockHeight = await this.api.getLatestBlockHeight());
    }
    async fetchBatchBlocks(buffer: number[]): Promise<FetchResult[]> {
        return await Promise.all(buffer.map(b => this.api.fetchBlockByHeight(b)));
    }
}
