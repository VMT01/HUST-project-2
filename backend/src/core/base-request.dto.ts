import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { EDirection } from '@constants/api.constant';

export class BasePaginationRequestDto {
    @ApiProperty({ required: false })
    @Min(1)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ required: false })
    @Min(1)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number;
}

export class BasePaginationWithSortRequestDto extends BasePaginationRequestDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    sortBy?: string;

    @ApiProperty({ required: false })
    @IsEnum(EDirection)
    @IsOptional()
    direction?: EDirection;

    @ApiProperty({ required: false })
    @IsOptional()
    limit?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    page?: number;
}
