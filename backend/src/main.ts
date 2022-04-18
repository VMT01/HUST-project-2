import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IndexerManager } from './indexer/providers/indexer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const indexer=app.get(IndexerManager)
  indexer.start()
  await app.listen(3000);
}
bootstrap();
