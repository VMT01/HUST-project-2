import { Injectable, NotFoundException } from '@nestjs/common';

import { BlockRepository } from './Block.repository';
import { BasePaginationResponseDto } from '@core/base-response.dto';
import { BlocksRequestDto } from './dtos/block-request.dto';

@Injectable()
export class BlockService {
    constructor(private readonly blockRepo: BlockRepository) {}

    async getBlocks(options: BlocksRequestDto) {
        const data = await this.blockRepo.getBlocks(options);

        return BasePaginationResponseDto.convertToPaginationResponse(data, options.page || 1);
    }

    async getBlockByHash(hash: string) {
        const block = await this.blockRepo.getBlockByHash(hash);
        if (!block) throw new NotFoundException('Block not found');

        return block;
    }
}
