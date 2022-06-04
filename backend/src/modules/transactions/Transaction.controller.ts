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
    getManyTxnsRoute(@Query() query: TxnsRequestDto) {
        return this.txnService.getManyTxns(query);
    }

    @Get(':identifier')
    @ApiOkResponse({ type: TxnResponseDto })
    getOneTxnRoute(@Param('identifier') identifier: string) {
        return this.txnService.getOneTxnByIdentifier(identifier);
    }
}
