import { Module } from '@nestjs/common';
import { BlockRepository } from '@modules/blocks/providers/block.repository';

import { TypeOrmModule } from '@nestjs/typeorm';

import BlockService from './providers/block.service';
import TransactionService from './providers/transaction.service';
import { TxnRepository } from '@modules/transactions/providers/Transaction.repository';

@Module({
    imports:[TypeOrmModule.forFeature([BlockRepository,TxnRepository])],
    providers: [BlockService,TransactionService],
    exports: [BlockService,TransactionService],
})
export class ModelsModule {}
