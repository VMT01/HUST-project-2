import { Injectable } from '@nestjs/common';
import { BlockTransactionObject } from 'web3-eth';

import { BlockRepository } from '@modules/blocks/providers/block.repository';

interface BlockQueryParams {
    page?: number;
    limit?: number;
    id?: number;
    hash?: string;
    isLatest?: Boolean;
    number?: number;
}
const DEFAULT_LIMIT = 5;
@Injectable()
class BlockService {
    constructor(private readonly blockRepo: BlockRepository) {}

    _buildQuery(params: BlockQueryParams) {
        let builder = this.blockRepo.createQueryBuilder();
        const { id, number, hash, isLatest, limit, page } = params;
        if (id) {
            builder = builder.where('id', { id });
        }
        if (number) {
            builder = builder.where('number', { number });
        }
        if (isLatest) {
            builder = builder.orderBy('number', 'DESC');
        }
        if (hash) {
            builder = builder.where('hash', { hash });
        }
        if (limit) {
            builder = builder.limit(limit);
        }
        if (page) {
            let _limit = limit ?? DEFAULT_LIMIT;
            builder = builder.offset(_limit * (page - 1));
        }
        return builder;
    }
    async getOne(params: BlockQueryParams) {
        let builder = this._buildQuery(params);

        return await builder.getOne();
    }
    async getMany(params: BlockQueryParams) {
        const page = Math.max(1, params.page) ?? 1;
        const limit = Math.max(1, params.limit) ?? DEFAULT_LIMIT;

        let builder = await this._buildQuery(params);
        const [result, total] = await builder.getManyAndCount();
        return {
            ...paginate(limit, page, total),
            data: result,
        };
    }
    // mutate
    async createOne(block: BlockTransactionObject) {
        const newBlock = this.blockRepo.create({
            number: block.number,
            hash: block.hash,
            parentHash: block.parentHash,
            nonce: block.nonce,
            sha3Uncles: block.sha3Uncles,
            logsBloom: block.logsBloom,
            transactionRoot: block.transactionRoot,
            stateRoot: block.stateRoot,
            receiptsRoot: block.receiptsRoot,
            miner: block.miner,
            extraData: block.extraData,
            gasLimit: block.gasLimit,
            gasUsed: block.gasUsed,
            timestamp: block.timestamp + '',
            baseFeePerGas: block.baseFeePerGas,
            size: block.size,
            difficulty: block.difficulty,
            totalDifficulty: block.totalDifficulty,
            uncles: block.uncles,
        });
        return await this.blockRepo.save(newBlock);
    }
}

function paginate(limit: number, page: number, total: number) {
    if (total === 0) page = 0;
    else if (total <= limit) page = 1;
    else page = Math.ceil(total / limit);

    return {
        limit,
        page,
        total,
    };
}

export default BlockService;
