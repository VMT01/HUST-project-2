import { BlockTransactionObject } from 'web3-eth';

export type BlockHandler = (block: BlockTransactionObject) => Promise<void>;
