import { Injectable } from '@nestjs/common';
import * as lodash from 'lodash';
import { FetchResult } from 'types/web3-types';

import { ECrawlerConfig } from '@constants/crawler.constant';

import { BlockedQueue } from '@shared/class-helper/BlockedQueue';
import { Connection } from '@shared/modules/web3/providers/web3.service';
import { delay } from '@shared/utils/promise';
import { BlockHandler } from 'types/common-types';

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

    async start(startBlock: number, handler: BlockHandler): Promise<any> {
        await this.init(startBlock);
        await Promise.all([this.fillBuffer(), this.takeBuffer(handler)]);
    }

    async fillBuffer() {
        while (!this.isStopped) {
            if (this.Buffer.freeSize > 0 && this.lastProcessingHeight < this.latestBlockHeight) {
                const start = this.lastProcessingHeight + 1;
                const end = Math.min(
                    this.Buffer.freeSize + this.lastProcessingHeight,
                    this.latestBlockHeight - this.lastProcessingHeight,
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
                await delay(ECrawlerConfig.TAKE_COUNT);
                continue;
            }

            const batch = await this.Buffer.takeAll(5);
            const blocks = await this.fetchBatchBlocks(batch);

            // process blocks
            blocks.forEach(async block => {
                if (block.status) {
                    handler(block);
                } else {
                    console.error('block index error,height=', block.height);
                }
            });
        }
    }

    async init(startBlock: number): Promise<void> {
        this.startBlock = startBlock;
        this.latestBlockHeight = await this.api.getLatestBlockHeight();
        this.lastProcessingHeight = this.startBlock - 1;
        // update latestBlockHeight every 15s.
        setInterval(async () => {
            this.latestBlockHeight = await this.api.getLatestBlockHeight();
        }, 15 * 1000);
    }

    async syncLatestProcessedBlock(height: number): Promise<void> {
        this.lastProcessingHeight = height;
        // db update!
    }

    async fetchBatchBlocks(buffer: number[]): Promise<FetchResult[]> {
        return await Promise.all(buffer.map(b => this.api.fetchBlockByHeight(b)));
    }
}
