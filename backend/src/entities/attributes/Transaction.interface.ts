export interface ITransactionAttribute {
    hash: string;
    nonce: number;
    blockHash?: string;
    blockNumber?: number;
    transactionIndex?: number;
    from: string;
    to?: string;
    value: string;
    gasPrice: string;
    maxPriorityFeePerGas?: number;
    maxFeePerGas?: number;
    gas: number;
    input: string;
}
