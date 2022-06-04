import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BlockService } from './providers/Block.service';
import { BlocksRequestDto } from './providers/dtos/block-request.dto';
import { BlockResponseDto } from './providers/dtos/block-response.dto';

@Controller('block')
@ApiTags('Block')
export class BlockController {
    constructor(private readonly blockService: BlockService) {}

    @Get()
    getBlocks(@Query() query: BlocksRequestDto) {
        return this.blockService.getBlocks(query);
    }

    @Get(':hash')
    @ApiOkResponse({ type: BlockResponseDto })
    getBlockByHash(@Param('hash') hash: string) {
        return this.blockService.getBlockByHashOrNumber(hash);
    }
}
