import { BlockModule } from './blocks/Block.module';
import { IndexerModule } from './indexer/indexer.module';
import { TransactionModule } from './transactions/Transaction.module';
import { AddressModule } from './addresses/Address.module';
import { CronModule } from './crons/crons.module';
export const MODULES = [IndexerModule, BlockModule, TransactionModule, AddressModule, CronModule];
