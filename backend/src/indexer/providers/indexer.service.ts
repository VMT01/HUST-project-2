import { Injectable } from '@nestjs/common';
import { Connection } from 'src/web3/providers/web3.service';
import { FetchService } from './fetch.service';
@Injectable()
export class IndexerManager {
  
  constructor(private api:Connection,private indexer:FetchService) {}
  async start(): Promise<void> {
   this.indexer.start(1,(b)=>{
     console.log(b);
     
   })
   
    
  }
}
