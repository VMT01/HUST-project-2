import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    type: number;

    @ApiProperty()
    address: string;
}
