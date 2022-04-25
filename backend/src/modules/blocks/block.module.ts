import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockRepository } from './providers/block.repository';

@Module({
    imports: [TypeOrmModule.forFeature([BlockRepository])],
})
export class BlockModule {}
