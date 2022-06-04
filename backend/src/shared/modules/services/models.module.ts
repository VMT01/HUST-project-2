import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockRepository } from '@modules/blocks/providers/block.repository';
import { TxnRepository } from '@modules/transactions/providers/Transaction.repository';

import BlockService from './providers/block.service';
import TransactionService from './providers/transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([BlockRepository, TxnRepository])],
    providers: [BlockService, TransactionService],
    exports: [BlockService, TransactionService],
})
export class ModelsModule {}
