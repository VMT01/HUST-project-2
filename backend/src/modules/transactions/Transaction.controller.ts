import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TxnsRequestDto } from './providers/dtos/txn-request.dto';
import { TxnResponseDto } from './providers/dtos/txn-response.dto';
import { TxnService } from './providers/Transaction.service';

@Controller('txn')
@ApiTags('Transaction')
export class TxnController {
    constructor(private readonly txnService: TxnService) {}

    @Get()
    getTxns(@Query() query: TxnsRequestDto) {
        return this.txnService.getTxns(query);
    }

    @Get(':hash')
    @ApiOkResponse({ type: TxnResponseDto })
    getBlockByHash(@Param('hash') hash: string) {
        return this.txnService.getTxnByHash(hash);
    }
}
