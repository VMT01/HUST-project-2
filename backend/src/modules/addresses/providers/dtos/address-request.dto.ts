import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';
import { EAddressType } from "@constants/entity.constant"
export class AddressesRequestDto extends BasePaginationWithSortRequestDto {
    id?: number;
    address?: string;
    type?: EAddressType;
}
