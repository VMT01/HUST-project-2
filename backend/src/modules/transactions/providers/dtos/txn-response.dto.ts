import { ApiProperty } from '@nestjs/swagger';

export class TxnResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    hash: string;

    @ApiProperty()
    nonce: number;

    @ApiProperty({ nullable: true })
    blockHash?: string;

    @ApiProperty({ nullable: true })
    blockNumber?: number;

    @ApiProperty({ nullable: true })
    transactionIndex?: number;

    @ApiProperty()
    from: string;

    @ApiProperty({ nullable: true })
    to?: string;

    @ApiProperty()
    value: string;

    @ApiProperty()
    gasPrice: string;

    @ApiProperty({ nullable: true })
    maxPriorityFeePerGas?: number;

    @ApiProperty()
    maxFeePerGas?: number;

    @ApiProperty()
    gas: number;

    @ApiProperty()
    input: string;
}
