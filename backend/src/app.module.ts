import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@config/config.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexerModule } from './modules/indexer/indexer.module';

@Module({
    imports: [ConfigurationModule, IndexerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
