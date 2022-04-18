import { Injectable } from '@nestjs/common';
import { Connection } from 'src/web3/providers/web3.service';
import { FetchService } from './fetch.service';
import { BlockTransactionObject } from 'web3-eth';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/shared/enum';

@Injectable()
export class IndexerManager {
  private startBlock: number;
  constructor(
    private indexer: FetchService,
    private configService: ConfigService,
  ) {}
  async start(): Promise<void> {
    // prepare indexer
    await this.prepare()


    // init fetch service.
    this.indexer.start(this.startBlock, this.indexBlock);
  }
  async prepare() {
    console.info("prepare indexer!")
    // restore start block from db or .env
    const envStartBlock = this.configService.get<string>(ENV.startBlock);
    const dbStartBlock = 1;
    this.startBlock = Math.max(parseInt(envStartBlock), dbStartBlock);
  }
  async indexBlock(block: BlockTransactionObject): Promise<void> {
    
  }
}
