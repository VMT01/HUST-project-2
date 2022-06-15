import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { AddressRepository } from './Address.repository';
import { AddressesRequestDto } from './dtos/address-request.dto';

@Injectable()
export class AddressService {
    constructor(private readonly addressRepo: AddressRepository) { }

    async getAddresses(options: AddressesRequestDto) {
        const data = await this.addressRepo.getMany(options);

        return BasePaginationResponseDto.convertToPaginationResponse(data, options.page || 1);
    }

    async getSingleAddress(identifier: string) {
        const option: AddressesRequestDto = {};
        if (identifier.match(/^0x[a-fA-F0-9]{40}$/)) {
            // indentifier is hash
            option.address = identifier;
        } else {
            throw new HttpException('Unknown address indentifier!', HttpStatus.BAD_REQUEST);
        }
        const block = await this.addressRepo.getOne(option);

        if (!block) throw new NotFoundException('address not found');

        return block;
    }
}
