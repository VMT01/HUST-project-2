import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { TxnsRequestDto } from './dtos/txn-request.dto';
import { TxnRepository } from './Transaction.repository';

@Injectable()
export class TxnService {
    constructor(private readonly txnRepo: TxnRepository) {}

    async getManyTxns(options: TxnsRequestDto) {
        const data = await this.txnRepo.getMany(options);

        return BasePaginationResponseDto.convertToPaginationResponse(data, options.page || 1);
    }

    async getOneTxnByIdentifier(identifier: string) {
        const options: TxnsRequestDto = {};
        // find by hash, uuid
        options.hash = identifier;
        const txn = await this.txnRepo.getOne(options);
        if (!txn) throw new NotFoundException('Transaction not found');

        return txn;
    }
}
