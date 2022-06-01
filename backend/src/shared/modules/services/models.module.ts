import { Module } from '@nestjs/common';
import { BlockRepository } from '@modules/blocks/providers/block.repository';

import { TypeOrmModule } from '@nestjs/typeorm';

import BlockService from './providers/block.service';
import TransactionService from './providers/transaction.service';
import { TransactionRepository } from '@modules/transactions/providers/Transaction.repository';

@Module({
    imports:[TypeOrmModule.forFeature([BlockRepository,TransactionRepository])],
    providers: [BlockService,TransactionService],
    exports: [BlockService,TransactionService],
})
export class ModelsModule {}
