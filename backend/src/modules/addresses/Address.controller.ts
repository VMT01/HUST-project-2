import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AddressService } from './providers/Address.service';
import { AddressesRequestDto } from './providers/dtos/address-request.dto';
import { AddressResponseDto } from './providers/dtos/address-response.dto';

@Controller('address')
@ApiTags('Address')
export class BlockController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    getBlocks(@Query() query: AddressesRequestDto) {
        return this.addressService.getAddresses(query);
    }

    @Get(':identifier')
    @ApiOkResponse({ type: AddressResponseDto })
    getBlockByHash(@Param('identifier') identifier: string) {
        return this.addressService.getSingleAddress(identifier);
    }
}
