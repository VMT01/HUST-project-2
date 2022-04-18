import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FetchResult } from 'src/types/web3-types';
const Web3=require('web3-eth')
import {Eth} from 'web3-eth'
@Injectable()
export class Connection {
  private web3: Eth;
 
  constructor( private configService: ConfigService) {
    
    const provider=this.configService.get<string>('PROVIDER')    
    if (!provider) throw new Error('missing provider!');
     this.web3 = new Web3(provider);
  }
  async fetchBlockByHeight(height: number): Promise<FetchResult> {
    try {
      const block = await this.web3.getBlock(height, true);
      if(!block.hash) throw new Error()
      return { block, status: true,height };
    } catch (error) {
      console.error("fetch error: ",error.message);
      
      return { status: false, block: null,height };
    }
  }
  async getLatestBlockHeight():Promise<number>{
    return await this.web3.getBlockNumber()
  }
}
