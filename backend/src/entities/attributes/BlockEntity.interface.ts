export interface IBlockAttribute {
    blockHash: string;
    blockNumber: number;
    difficulty: string;
    gasLimit: number;       // = sum gas limit per transaction
    gasUsed: number;        // = sum gas used per transaction
    logsBloom: string;      // = ?
    miner: string;          // = address who mine this block
    nonce: string;          // = an unique number to change hash
    parentHash: string;     // = hash of previous block
    receiptsRoot: string;   // = ?
    sha3Uncles: string;     // = ?
    size: number;           // = size of block
    stateRoot: string;      // = default state of block
    timestamp: string;      // = block time
    totalDifficulty: string;
}