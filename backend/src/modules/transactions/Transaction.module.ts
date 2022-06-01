import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TxnRepository } from './providers/Transaction.repository';
import { TxnService } from './providers/Transaction.service';
import { TxnController } from './Transaction.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TxnRepository])],
    controllers: [TxnController],
    providers: [TxnService],
})
export class TransactionModule {}
