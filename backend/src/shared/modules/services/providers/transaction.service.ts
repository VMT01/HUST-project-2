import { Injectable } from '@nestjs/common';

import {Transaction} from 'web3-core/types'



import { TransactionRepository } from '@modules/transactions/providers/Transaction.repository';
import { TransactionEntity } from '@entities/Transaction.entity';

interface TransactionQueryParams {
    page?: number;
    limit?: number;
    id?: number;
    hash?: string;
    isLatest?: Boolean;
    number?: number;
}
const DEFAULT_LIMIT = 5;
@Injectable()
class TransactionService {
    constructor(private readonly transactionRepo: TransactionRepository) {}

    _buildQuery(params: TransactionQueryParams) {
        let builder = this.transactionRepo.createQueryBuilder();
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
    async getOne(params: TransactionQueryParams) {
        let builder = this._buildQuery(params);

        return await builder.getOne();
    }
    async getMany(params: TransactionQueryParams) {
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
    async createMany(txn: Transaction[]) {
        const transactions = [] as TransactionEntity[];
        txn.forEach(transaction => {
            const newTransaction = this.transactionRepo.create({
                hash: transaction.hash,
                nonce: transaction.nonce,
                blockHash: transaction.blockHash,
                blockNumber: transaction.blockNumber,
                transactionIndex: transaction.transactionIndex,
                from: transaction.from,
                to: transaction.to,
                value: transaction.value,
                gasPrice: transaction.gasPrice,
                maxPriorityFeePerGas: transaction.maxPriorityFeePerGas && +transaction.maxPriorityFeePerGas,
                maxFeePerGas: transaction.maxFeePerGas && +transaction.maxFeePerGas,
                gas: transaction.gas,
                input: transaction.input,
            });
            transactions.push(newTransaction);
        });
        this.transactionRepo.save(transactions);
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

export default TransactionService;
