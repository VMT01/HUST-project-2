import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { BlockQueryParams, BlockRepository } from './Block.repository';
//import { BlocksRequestDto } from './dtos/block-request.dto';

@Injectable()
export class BlockService {
    constructor(private readonly blockRepo: BlockRepository) {}

    async getBlocks(options: BlockQueryParams) {
        
        const data = await this.blockRepo.getMany(options);

        return BasePaginationResponseDto.convertToPaginationResponse(data, options.page || 1);
    }

    async getBlockByHashOrNumber(identifier: string) {
        const option: BlockQueryParams = {};
        if (identifier.match(/^0x([A-Fa-f0-9]{64})$/)) {// indentifier is hash
            option.hash = identifier;
        } else if (identifier.match(/^[0-9]*$/)) { // identifier is block number
            option.number = parseInt(identifier);
        } else {
            throw new HttpException('Unknown block indentifier!', HttpStatus.BAD_REQUEST);
        }

        const block = await this.blockRepo.getOne(option);

        if (!block) throw new NotFoundException('Block not found');

        return block;
    }
}
