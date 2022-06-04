import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';

export class BlocksRequestDto extends BasePaginationWithSortRequestDto {
    id?: number;
    hash?: string;
    number?: number;
}
