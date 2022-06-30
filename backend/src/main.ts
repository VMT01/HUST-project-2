import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from 'swagger';

import { EEnvKey } from '@constants/env.constant';

import { IndexerManager } from '@modules/indexer/providers/indexer.service';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    app.setGlobalPrefix(configService.get<string>(EEnvKey.GLOBAL_PREFIX));
    app.enableCors();

    /* Indexer */
    /* Currently stop crawl - Uncomment this later to continue crawling */
    const indexer = app.get(IndexerManager);
    indexer.start();

    /* Swagger */
    if (configService.get<string>(EEnvKey.SWAGGER_PATH)) {
        initSwagger(app, configService.get<string>(EEnvKey.SWAGGER_PATH));
    }

    await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
}
bootstrap();
