import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { TxnsRequestDto } from './dtos/txn-request.dto';
import { TxnRepository } from './Transaction.repository';

@Injectable()
export class TxnService {
    constructor(private readonly txnRepo: TxnRepository) {}

    async getTxns(options: TxnsRequestDto) {
        const data = await this.txnRepo.getTxns(options);

        return BasePaginationResponseDto.convertToPaginationResponse(data, options.page || 1);
    }

    async getTxnByHash(hash: string) {
        const txn = await this.txnRepo.getTxnByHash(hash);
        if (!txn) throw new NotFoundException('Transaction not found');

        return txn;
    }
}
