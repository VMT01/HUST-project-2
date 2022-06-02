import { BlockModule } from './blocks/Block.module';
import { IndexerModule } from './indexer/indexer.module';
import { TransactionModule } from './transactions/Transaction.module';

export const MODULES = [IndexerModule, BlockModule, TransactionModule];
