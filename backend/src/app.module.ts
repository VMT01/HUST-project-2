import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexerModule } from './indexer/indexer.module';
import { Web3Module } from './web3/web3.module';
import { ConfigModule } from '@nestjs/config';
import { Connection } from './web3/providers/web3.service';
@Module({
  imports: [IndexerModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
