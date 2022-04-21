import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@config/config.module';
import { DatabaseModule } from '@config/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES } from './modules';

@Module({
    imports: [ConfigurationModule, DatabaseModule, ...MODULES],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
