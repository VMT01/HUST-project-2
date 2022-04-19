import { BlockTransactionObject } from 'web3-eth';

export interface FetchResult {
    block: BlockTransactionObject | null;
    status: boolean;
    height: number;
}
