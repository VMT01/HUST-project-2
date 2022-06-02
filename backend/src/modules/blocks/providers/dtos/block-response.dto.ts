import { ApiProperty } from "@nestjs/swagger";

export class BlockResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    number: number;
    
    @ApiProperty()
    hash: string;
    
    @ApiProperty()
    parentHash: string;
    
    @ApiProperty()
    nonce: string;
    
    @ApiProperty()
    sha3Uncles: string;
    
    @ApiProperty()
    logsBloom: string;
    
    @ApiProperty({ nullable: true })
    transactionRoot?: string;
    
    @ApiProperty()
    stateRoot: string;
    
    @ApiProperty()
    receiptsRoot: string;
    
    @ApiProperty()
    miner: string;
    
    @ApiProperty()
    extraData: string;
    
    @ApiProperty()
    gasLimit: number;
    
    @ApiProperty()
    gasUsed: number;
    
    @ApiProperty()
    timestamp: string;
    
    @ApiProperty({ nullable: true })
    baseFeePerGas?: number;
    
    @ApiProperty()
    size: number;
    
    @ApiProperty()
    difficulty: number;
    
    @ApiProperty()
    totalDifficulty: number;
    
    @ApiProperty({ isArray: true })
    uncles: string[];
}
