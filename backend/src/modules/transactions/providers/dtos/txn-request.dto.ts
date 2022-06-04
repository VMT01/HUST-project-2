import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';

export class TxnsRequestDto extends BasePaginationWithSortRequestDto {
    hash?: string;
    id?: string;
    blockNumber?: string;
}
