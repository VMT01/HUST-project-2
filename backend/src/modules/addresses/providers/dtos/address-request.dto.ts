import { EAddressType } from '@constants/entity.constant';

import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';

export class AddressesRequestDto extends BasePaginationWithSortRequestDto {
    id?: number;
    address?: string;
    type?: EAddressType;
}
