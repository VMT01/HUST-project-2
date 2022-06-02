import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockController } from './Block.controller';
import { BlockRepository } from './providers/Block.repository';
import { BlockService } from './providers/Block.service';

@Module({
    imports: [TypeOrmModule.forFeature([BlockRepository])],
    controllers: [BlockController],
    providers: [BlockService],
})
export class BlockModule {}
