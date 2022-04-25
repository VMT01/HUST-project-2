export interface IBlockAttribute {
    /* Block Header */
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionRoot?: string;
    stateRoot: string;
    receiptsRoot: string;
    miner: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: string;
    baseFeePerGas?: number;

    /* Transaction base */
    size: number;
    difficulty: number;
    totalDifficulty: number;
    uncles: string[];
}
