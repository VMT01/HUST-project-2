import { Injectable } from '@nestjs/common';
import { Connection } from 'src/web3/providers/web3.service';
import { delay } from 'src/utils/promise';
import { BlockedQueue } from 'src/shared/BlockedQueue';
import { FetchResult } from 'src/types/web3-types';
const _ = require('lodash');
const configs = {
  BATCH_SIZE: 100,
  TAKE_COUNT: 5,
};
@Injectable()
export class FetchService {
  private isStopped: boolean = false;
  private lastProcessingHeight: number;
  private latestBlockHeight: number;
  private startBlock: number = 1;

  private Buffer: BlockedQueue<number>;
  constructor(private api: Connection) {
    this.Buffer = new BlockedQueue<number>(100);
  }
  async start(startBlock: number, handler: Function): Promise<any> {
    await this.init(startBlock);
    await Promise.all([this.fillBuffer(), this.takeBuffer(handler)]);
  }
  async fillBuffer() {
    while (!this.isStopped) {
      if (
        this.Buffer.freeSize > 0 &&
        this.lastProcessingHeight < this.latestBlockHeight
      ) {
        const start = this.lastProcessingHeight + 1;
        const end = Math.min(
          this.Buffer.freeSize + this.lastProcessingHeight,
          this.latestBlockHeight - this.lastProcessingHeight,
        );
        const blocksBuffer = _.range(start, end + 1, 1);
        this.Buffer.putAll(blocksBuffer);
        // update lastProcessingHeight.
        this.lastProcessingHeight = end;
      } else {
        await delay(1);
        continue;
      }
    }
  }
  async takeBuffer(handler: Function) {
    while (!this.isStopped) {
      if (this.Buffer.size <= 0) {
        await delay(5);
        continue;
      }

      const batch = await this.Buffer.takeAll(5);
      const blocks = await this.fetchBatchBlocks(batch);
      blocks.forEach(async (b) => {
        if (b.status) {
          await handler(b);
        } else {
          console.log('block index error,height=', b.height);
        }
      });
    }
  }
  async init(startBlock: number) {
    this.startBlock = startBlock;
    this.latestBlockHeight = await this.api.getLatestBlockHeight();
    this.lastProcessingHeight = this.startBlock - 1;
    // update latestBlockHeight every 15s.
    setInterval(async () => {
      this.latestBlockHeight = await this.api.getLatestBlockHeight();
    }, 15 * 1000);
  }
  async fetchBatchBlocks(buffer: number[]): Promise<FetchResult[]> {
    return await Promise.all(buffer.map((b) => this.api.fetchBlockByHeight(b)));
  }
}
